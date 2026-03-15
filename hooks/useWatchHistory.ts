'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  getWatchHistoryFromStorage,
  saveWatchHistoryToStorage,
} from '@/lib/storage';
import type { WatchHistoryItem } from '@/types/watch-history';
import type { ContentItem } from '@/types/content';

type WatchHistoryMap = Record<number, WatchHistoryItem>;

export const useWatchHistory = (contentItems: ContentItem[]) => {
  const [historyMap, setHistoryMap] = useState<WatchHistoryMap>({});

  useEffect(() => {
    const storedHistory = getWatchHistoryFromStorage();
    setHistoryMap(storedHistory);
  }, []);

  useEffect(() => {
    saveWatchHistoryToStorage(historyMap);
  }, [historyMap]);

const updateProgress = (contentId: number, progress: number) => {
  const normalizedProgress = Math.max(0, Math.min(100, Math.round(progress)));

  setHistoryMap((prev) => ({
    ...prev,
    [contentId]: {
      contentId,
      progress: normalizedProgress,
      updatedAt: new Date().toISOString(),
    },
  }));
};

  const markAsWatched = (contentId: number) => {
    updateProgress(contentId, 100);
  };

  const historyItems = useMemo(() => {
    return Object.values(historyMap)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .map((entry) => {
        const content = contentItems.find((item) => item.id === entry.contentId);

        if (!content) {
          return null;
        }

        return {
          ...content,
          watchProgress: entry.progress,
          updatedAt: entry.updatedAt,
        };
      })
      .filter(Boolean) as Array<ContentItem & { updatedAt: string }>;
  }, [historyMap, contentItems]);

  const getProgressById = (contentId: number) => {
    return historyMap[contentId]?.progress ?? 0;
  };

  return {
    historyItems,
    updateProgress,
    markAsWatched,
    getProgressById,
  };
};