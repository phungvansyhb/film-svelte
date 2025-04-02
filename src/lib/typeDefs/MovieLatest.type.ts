export type MovieLatestList = {
  status: boolean;
  items: Array<{
    tmdb: {
      type: string;
      id: string;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    imdb: {
      id: string;
    };
    modified: {
      time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    thumb_url: string;
    poster_url: string;
    year: number;
  }>;
  pathImage: string;
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
};
