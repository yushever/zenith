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
      <div className="relative">
        <img
          src={item.thumbnail}
          alt={`${item.title} poster`}
          className="h-[260px] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <span className="inline-flex rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
            ⭐ {item.rating}
          </span>
        </div>
      </div>

      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-white/60">{item.year}</p>
      </div>
    </button>
  );
};