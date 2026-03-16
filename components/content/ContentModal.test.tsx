import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ContentModal } from './ContentModal';
import type { ContentItem } from '@/types/content';

const mockItem: ContentItem = {
  id: 1,
  title: 'The Meowtrix',
  year: 2025,
  genre: ['Sci-Fi', 'Action'],
  rating: 8.5,
  thumbnail: 'https://placedog.net/500/750',
  video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  duration: 115,
  description: 'A rebellious cat discovers the truth about the world.',
  cast: ['Neo the Cat', 'Trinity Paw'],
  watchProgress: 0,
};

describe('ContentModal', () => {
  it('renders modal content when open', () => {
    render(
      <ContentModal
        item={mockItem}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('The Meowtrix')).toBeInTheDocument();
    expect(
      screen.getByText('A rebellious cat discovers the truth about the world.'),
    ).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('does not render when item is null', () => {
    render(
      <ContentModal
        item={null}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when esc key is pressed', () => {
    const onClose = vi.fn();

    render(
      <ContentModal
        item={mockItem}
        isOpen={true}
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});