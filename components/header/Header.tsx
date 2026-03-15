export const Header = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-lg font-bold tracking-wide text-white">
          StreamBox
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden gap-6 text-sm text-white/80 md:flex"
        >
          <a href="#" className="transition hover:text-white">
            Home
          </a>
          <a href="#" className="transition hover:text-white">
            Movies
          </a>
          <a href="#" className="transition hover:text-white">
            Series
          </a>
          <a href="#" className="transition hover:text-white">
            My List
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 md:block">
            Search
          </div>
          <div
            aria-label="User profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium"
          >
            T
          </div>
        </div>
      </div>
    </header>
  );
};
