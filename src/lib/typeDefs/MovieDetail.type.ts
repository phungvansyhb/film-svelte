export type MovieDetail = {
  status: string;
  message: string;
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      seoSchema: {
        "@context": string;
        "@type": string;
        name: string;
        dateModified: string;
        dateCreated: string;
        url: string;
        datePublished: string;
        image: string;
        director: string;
      };
      descriptionHead: string;
      og_image: string[];
      updated_time: number;
      og_url: string;
    };
    breadCrumb: Array<{
      name: string;
      slug?: string;
      position: number;
      isCurrent?: boolean;
    }>;
    params: {
      slug: string;
    };
    item: {
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
      created: {
        time: string;
      };
      modified: {
        time: string;
      };
      _id: string;
      name: string;
      slug: string;
      origin_name: string;
      content: string;
      type: string;
      status: string;
      thumb_url: string;
      poster_url: string;
      is_copyright: boolean;
      sub_docquyen: boolean;
      chieurap: boolean;
      trailer_url: string;
      time: string;
      episode_current: string;
      episode_total: string;
      quality: string;
      lang: string;
      notify: string;
      showtimes: string;
      year: number;
      view: number;
      actor: string[];
      director: string[];
      category: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
      country: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
      episodes: Array<{
        server_name: string;
        server_data: Array<{
          name: string;
          slug: string;
          filename: string;
          link_embed: string;
          link_m3u8: string;
        }>;
      }>;
    };
  };
};