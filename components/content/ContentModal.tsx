'use client';

import { useEffect } from 'react';
import type { ContentItem } from '@/types/content';

type ContentModalProps = {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ContentModal = ({
  item,
  isOpen,
  onClose,
}: ContentModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="content-modal-title"
        aria-describedby="content-modal-description"
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-2 text-sm text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          ✕
        </button>

        <div className="grid gap-0 md:grid-cols-[320px_1fr]">
          <div className="bg-neutral-800">
            <img
              src={item.thumbnail}
              alt={`${item.title} poster`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4 p-6 md:p-8">
            <div className="space-y-2">
              <h2
                id="content-modal-title"
                className="text-2xl font-bold sm:text-3xl"
              >
                {item.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span>{item.year}</span>
                <span className="rounded-full bg-white/10 px-2 py-1">
                  ⭐ {item.rating}
                </span>
              </div>
            </div>

            <p
              id="content-modal-description"
              className="text-sm leading-6 text-white/80 sm:text-base"
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};