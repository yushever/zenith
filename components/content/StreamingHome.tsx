'use client';

import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import { Header } from '@/components/header/Header';
import { ContentRow } from '@/components/content/ContentRow';
import { ContentSkeleton } from '@/components/content/ContentSkeleton';
import { ContentModal } from '@/components/content/ContentModal';
import type { ContentItem } from '@/types/content';

export const StreamingHome = () => {
  const { trending, loading, error } = useContent();
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading && <ContentSkeleton />}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <ContentRow
            title="Trending Now"
            items={trending}
            onSelect={setSelectedItem}
          />
        )}
      </div>

        <ContentModal
            item={selectedItem}
            isOpen={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
        />

    </main>
  );
};