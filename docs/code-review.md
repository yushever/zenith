# Code Review

## 1) Loading state can break because of race condition

### What breaks

If the user changes the page quickly, previous requests are aborted, but their `.finally()` still runs. So an old request can set `loading = false` **while a new request is still loading**.

Result:
- loader disappears too early
- UI looks like data is ready, but it’s not

### Before

```tsx
useEffect(() => {
  const controller = new AbortController();

  setLoading(true);

  fetchContent(page, controller.signal)
    .then((data) => {
      setTrendingContent(data.categories.trending);
      setError(null);
    })
    .catch((err) => {
      if (err.name === 'AbortError') return;
      setError('Failed to load content');
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, [page]);
```

### After

```tsx
useEffect(() => {
  const controller = new AbortController();
  let isCurrent = true;

  setLoading(true);

  fetchContent(page, controller.signal)
    .then((data) => {
      if (!isCurrent) return;

      setTrendingContent(
        Array.isArray(data?.categories?.trending)
          ? data.categories.trending
          : []
      );
      setError(null);
    })
    .catch((err) => {
      if (!isCurrent || err.name === 'AbortError') return;
      setError('Failed to load content');
    })
    .finally(() => {
      if (isCurrent) setLoading(false);
    });

  return () => {
    isCurrent = false;
    controller.abort();
  };
}, [page]);
```

### Why it matters

In a real streaming app, users scroll and switch content fast. If loading behaves incorrectly, the UI becomes confusing.

## 2) Cards are not accessible (only work with mouse)

### What breaks

Each item is a clickable `<div>`, which:
- can’t be focused with keyboard
- doesn’t work with Enter/Space
- is not announced properly by screen readers

### Before

```tsx
{trendingContent.map((item) => (
  <div key={item.id} onClick={() => handleItemClick(item)}>
    <img src={item.thumbnail} alt={item.title} />
    <h3>{item.title}</h3>
  </div>
))}
```

### After

```tsx
{trendingContent.map((item) => (
  <button
    key={item.id}
    type="button"
    onClick={() => handleItemClick(item)}
    className="content-card"
    aria-labelledby={`title-${item.id}`}
  >
    <img src={item.thumbnail} alt="" />
    <h3 id={`title-${item.id}`}>{item.title}</h3>
  </button>
))}
```

### Why it matters

The Trending section is the main way users discover content. If it doesn’t work with a keyboard or on TV devices, it becomes a real problem for users.

## 3) Modal is not really accessible

### What breaks

The dialog opens visually, but:
- focus doesn’t move inside
- Escape doesn’t close it
- focus is not returned after closing
- background is still interactive

So the user can lose focus, tab somewhere behind the modal, or get stuck.

### Before

```tsx
{selectedItem && (
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">{selectedItem.title}</h2>
    <button onClick={() => setSelectedItem(null)}>Close</button>
  </div>
)}
```

### After

```tsx
const closeButtonRef = useRef<HTMLButtonElement | null>(null);
const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

const handleItemClick = (item: ContentItem, trigger: HTMLButtonElement) => {
  lastTriggerRef.current = trigger;
  setSelectedItem(item);
};

useEffect(() => {
  if (!selectedItem) return;

  closeButtonRef.current?.focus();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedItem(null);
    }
  };

  document.addEventListener('keydown', onKeyDown);
  return () => document.removeEventListener('keydown', onKeyDown);
}, [selectedItem]);

useEffect(() => {
  if (!selectedItem && lastTriggerRef.current) {
    lastTriggerRef.current.focus();
  }
}, [selectedItem]);
```

### Why it matters

Opening content details is a key user action. If the modal behaves incorrectly, users get confused and it directly impacts the UX.

## 4) `useCallback` is unnecessary here

### What’s the issue

`useCallback` is used, but it doesn’t actually give any benefit:
- the handler is wrapped in an inline function: `onClick={() => handleItemClick(item)}`
- so a new function is created on every render anyway

### Before

```tsx
const handleItemClick = useCallback((item: ContentItem) => {
  setSelectedItem(item);
}, []);
```

### After

```tsx
const handleItemClick = (item: ContentItem) => {
  setSelectedItem(item);
};
```

### Why it matters

This doesn’t cause a bug, but it adds unnecessary complexity and can be misleading. It looks like an optimization, but in reality it does nothing here.

Better to keep the code simple and only use `useCallback` when it actually helps, for example with memoized children.