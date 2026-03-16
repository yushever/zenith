## About

A small streaming-style interface built with **Next.js**, **React**, **TypeScript** and **Tailwind CSS**.

The project implements:

- content browsing
- modal video player
- watch progress tracking
- watch history section
- basic accessibility (ARIA + keyboard navigation)
- unit tests

## Setup

Install dependencies
`npm install`

Run development server
`npm run dev`

Run tests
`npm run test`

## Architectural decisions

The project follows a simple component-driven architecture.

- **UI components are separated from business logic.**
  Visual components such as `ContentCard`, `ContentRow`, `ContentModal` and `HistorySection` are responsible only for rendering UI.
- **Application logic is extracted into custom hooks.**
  Hooks like `useContent`, `useWatchHistory` and `useFocusTrap` encapsulate reusable logic such as data loading, watch history persistence and accessibility behavior.
- **Persistence is handled with localStorage.**
  Watch progress is stored locally via `useWatchHistory`, allowing the Watch History section to persist between page reloads.
- **Styling is implemented with Tailwind CSS.**
  Tailwind enables rapid UI iteration and keeps styling colocated with components.

## Key decisions

### 1. Watch history stored in localStorage

Watch progress is persisted using a custom hook `useWatchHistory` that stores progress values in `localStorage`.

Tradeoff:

* simple implementation
* works without backend
* progress is stored only locally

### 2. Video progress tracking

Watch progress is calculated using the HTML5 video API:

<pre class="overflow-visible! px-0!" data-start="1575" data-end="1616"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>progress = currentTime / duration</span></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

The progress is updated during playback via the `onTimeUpdate` event.

Tradeoff:

* simple implementation
* in production this would likely be throttled or debounced

### 3. Custom focus trap

Keyboard navigation inside the modal is implemented using a small custom hook `useFocusTrap`.

Tradeoff:

* lightweight implementation
* fewer features compared to dedicated accessibility libraries

## Assumptions (UX)

Several UX assumptions were made:

- The **Trending** section is implemented as a horizontal scroll list to resemble common streaming platform layouts.
- Watch progress is stored locally and displayed as a progress bar on content cards.
- The **Watch History** section appears only when at least one item has recorded progress.
- The modal dialog supports keyboard navigation and can be closed with the **Escape key** or by clicking outside.
- Video playback uses a simple HTML5 player instead of a full streaming solution since real streaming infrastructure is out of scope.
