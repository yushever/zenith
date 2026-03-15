export const ContentSkeleton = () => {
  return (
    <section aria-label="Loading content" className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-white/10" />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-w-[180px] overflow-hidden rounded-2xl bg-neutral-900"
            aria-hidden="true"
          >
            <div className="h-[260px] animate-pulse bg-white/10" />
            <div className="space-y-2 p-3">
              <div className="h-4 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};