'use client';

import { useEffect, useState } from 'react';
import { fetchContent } from '@/lib/content-api';
import type { ContentItem } from '@/types/content';

export const useContent = () => {
  const [trending, setTrending] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await fetchContent(controller.signal);
        setTrending(data.categories.trending);
        setError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    return () => controller.abort();
  }, []);

  return {
    trending,
    loading,
    error,
  };
};
