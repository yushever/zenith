export type ContentItem = {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  thumbnail: string;
  video_url: string;
  duration: number;
  description: string;
  cast: string[];
  watchProgress: number;
};

export type ApiResponse = {
  categories: {
    trending: ContentItem[];
  };
};