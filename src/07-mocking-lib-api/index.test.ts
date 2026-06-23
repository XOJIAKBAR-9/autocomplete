import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    throttledGetDataFromApi('/posts');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'data' });
    jest.spyOn(axios, 'create').mockReturnValue({ get: getMock } as any);
    throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    expect(getMock).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: 'data' });
    jest.spyOn(axios, 'create').mockReturnValue({ get: getMock } as any);
    const result = throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    expect(await result).toBe('data');
  });
});