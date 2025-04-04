export type MovieList = {
  status: string;
  message: string;
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: string[];
      og_url: string;
    };
    breadCrumb: {
      name: string;
      slug?: string;
      isCurrent: boolean;
      position: number;
    }[];
    titlePage: string;
    items: {
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
      type: string;
      thumb_url: string;
      poster_url: string;
      sub_docquyen: boolean;
      chieurap: boolean;
      time: string;
      episode_current: string;
      quality: string;
      lang: string;
      year: number;
      category: {
        id: string;
        name: string;
        slug: string;
      }[];
      country: {
        id: string;
        name: string;
        slug: string;
      }[];
    }[];
    params: {
      type_slug: string;
      filterCategory: string[];
      filterCountry: string[];
      filterYear: number;
      filterType: string;
      sortField: string;
      sortType: string;
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        pageRanges: number;
      };
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

export type MovieListItem = MovieList['data']['items'][number]