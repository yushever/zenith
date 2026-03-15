import { mockContent } from '@/data/mock-content';
import type { ApiResponse } from '@/types/content';

export const fetchContent = async (signal?: AbortSignal): Promise<ApiResponse> => {
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => resolve(), 1000);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Request aborted', 'AbortError'));
    });
  });

  return {
    categories: {
      trending: mockContent,
    },
  };
};