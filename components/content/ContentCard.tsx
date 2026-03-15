import type { ContentItem } from '@/types/content';

type ContentCardProps = {
  item: ContentItem;
  onClick: () => void;
};

export const ContentCard = ({ item, onClick }: ContentCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-w-[180px] max-w-[180px] overflow-hidden rounded-2xl bg-neutral-900 text-left transition duration-200 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/60"
      aria-label={`Open details for ${item.title}`}
    >
      <img
        src={item.thumbnail}
        alt={`${item.title} poster`}
        className="h-[260px] w-full object-cover"
        onError={(e) => {
            e.currentTarget.src = "https://placehold.co/500x750?text=No+Poster";
        }}
      />

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-white/60">
          {item.year} • {item.rating}
        </p>
      </div>
    </button>
  );
};