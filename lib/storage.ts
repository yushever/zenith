import type { WatchHistoryItem } from '@/types/watch-history';

const WATCH_HISTORY_KEY = 'watch-history';

type WatchHistoryMap = Record<number, WatchHistoryItem>;

export const getWatchHistoryFromStorage = (): WatchHistoryMap => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const value = window.localStorage.getItem(WATCH_HISTORY_KEY);

    if (!value) {
      return {};
    }

    return JSON.parse(value) as WatchHistoryMap;
  } catch {
    return {};
  }
};

export const saveWatchHistoryToStorage = (history: WatchHistoryMap): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history));
};
