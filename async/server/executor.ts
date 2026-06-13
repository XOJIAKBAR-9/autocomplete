export interface DataItem {
    id: string;
    value: number;
}

export class Executor {
    constructor(private task: (data: DataItem[], signal?: AbortSignal) => Promise<void>) {}

    public async runTaskWithTimeout(data: DataItem[]): Promise<void> {
        const controller = new AbortController();
        
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 60000);

        try {
            await this.task(data, controller.signal);
        } catch (error) {
            console.error("Task execution error:", error instanceof Error ? error.message : String(error));
        } finally {
            clearTimeout(timeoutId);
        }
    }

    public start() {
        const data: DataItem[] = Array.from({ length: 3000 }, (_, i) => ({
            id: `item-${i + 1}`,
            value: Math.random() * 100,
        }));

        this.runTaskWithTimeout(data);
    }
}