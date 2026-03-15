import type { ContentItem } from '@/types/content';
import { ContentCard } from '@/components/content/ContentCard';

type ContentRowProps = {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
};

export const ContentRow = ({ title, items, onSelect }: ContentRowProps) => {
  return (
    <section aria-labelledby="trending-heading" className="space-y-4">
      <h2 id="trending-heading" className="text-2xl font-semibold">
        {title}
      </h2>

      <div
        className="flex gap-4 overflow-x-auto pb-2"
        role="list"
        aria-label={`${title} content list`}
      >
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>
    </section>
  );
};