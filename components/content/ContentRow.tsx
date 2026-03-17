'use client';

import { useRef } from 'react';
import type { ContentItem } from '@/types/content';
import { ContentCard } from '@/components/content/ContentCard';

type ContentRowProps = {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
};

export const ContentRow = ({ title, items, onSelect }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -clientWidth : clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section aria-labelledby="trending-heading" className="space-y-4">
      <h2 id="trending-heading" className="text-2xl font-semibold">
        {title}
      </h2>

      <div className="group relative">
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-white transition hover:bg-black/90 md:block md:opacity-0 md:group-hover:opacity-100"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-white transition hover:bg-black/90 md:block md:opacity-0 md:group-hover:opacity-100"
        >
          →
        </button>

        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          role="list"
          aria-label={`${title} content list`}
        >
          {items.map((item) => (
            <div key={item.id} className="shrink-0" role="listitem">
              <ContentCard item={item} onClick={() => onSelect(item)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};