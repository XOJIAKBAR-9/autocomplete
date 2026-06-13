import { Executor, DataItem } from './executor';

export async function task(data: DataItem[], signal?: AbortSignal): Promise<void> {
    return new Promise((resolve) => {
        const MAX_CONCURRENT = 20;
        let activeRequests = 0;
        let currentIndex = 0;

        let processed = 0;
        let successful = 0;
        let failed = 0;
        let lost = 0;
        let skipped = 0;

        const printSummary = () => {
            console.info('--- Final Results ---');
            console.info(`Processed : ${processed}`);
            console.info(`Successful: ${successful}`);
            console.info(`Failed    : ${failed}`);
            console.info(`Lost      : ${lost}`);
            console.info(`Skipped   : ${skipped}`);
        };

        const checkDone = () => {
            if (currentIndex >= data.length && activeRequests === 0) {
                printSummary();
                resolve();
            } else if (signal?.aborted && activeRequests === 0) {
                printSummary();
                resolve();
            }
        };

        const processItem = async (item: DataItem) => {
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts) {
                attempts++;
                try {
                    const response = await fetch('http://localhost:3000/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(item),
                    });

                    if (response.status === 200) {
                        successful++;
                        console.info(`[Success] Item ${item.id}`);
                        return;
                    } else if (response.status === 503) {
                        lost++;
                        console.error(`[Lost] Server Overload for ${item.id}`);
                        return;
                    } else if (response.status === 500) {
                        console.warn(`[Retry ${attempts}/${maxAttempts}] Item ${item.id} failed with 500`);
                        if (attempts === maxAttempts) {
                            failed++;
                            console.error(`[Failed] Item ${item.id} failed after ${maxAttempts} attempts`);
                            return;
                        }
                    } else {
                        failed++;
                        return;
                    }
                } catch (error) {
                    console.error(`[Network Error] Item ${item.id}`, error instanceof Error ? error.message : String(error));
                    if (attempts === maxAttempts) {
                        failed++;
                        return;
                    }
                }
            }
        };

        const runNext = () => {
            if (signal?.aborted) {
                if (currentIndex < data.length) {
                    skipped += (data.length - currentIndex);
                    currentIndex = data.length;
                }
                checkDone();
                return;
            }

            while (activeRequests < MAX_CONCURRENT && currentIndex < data.length && !signal?.aborted) {
                const item = data[currentIndex++];
                activeRequests++;
                processed++;

                processItem(item).finally(() => {
                    activeRequests--;
                    runNext();
                    checkDone();
                });
            }
            
            checkDone();
        };

        signal?.addEventListener('abort', () => {
            if (currentIndex < data.length) {
                skipped += (data.length - currentIndex);
                currentIndex = data.length;
            }
        });

        runNext();
    });
}

const executor = new Executor(task);
executor.start();