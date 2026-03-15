import type { ContentItem } from '@/types/content';
import { ProgressBar } from '@/components/content/ProgressBar';

type HistoryItem = ContentItem & {
  updatedAt: string;
};

type HistorySectionProps = {
  items: HistoryItem[];
  onSelect: (item: ContentItem) => void;
};

export const HistorySection = ({ items, onSelect }: HistorySectionProps) => {
  return (
    <section
      aria-labelledby="watch-history-heading"
      className="mt-10 space-y-4"
    >
      <h2 id="watch-history-heading" className="text-2xl font-semibold">
        Watch History
      </h2>

      {items.length === 0 && (
        <p className="text-sm text-white/60">
          You haven&apos;t watched anything yet.
        </p>
      )}

      {items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="overflow-hidden rounded-2xl bg-neutral-900 text-left transition hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label={`Open watch history item ${item.title}`}
            >
              <img
                src={item.thumbnail}
                alt={`${item.title} poster`}
                className="h-56 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <div>
                  <h3 className="line-clamp-1 text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/60">
                    {item.year} • {item.watchProgress}%
                  </p>
                </div>

                <ProgressBar value={item.watchProgress} />
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
