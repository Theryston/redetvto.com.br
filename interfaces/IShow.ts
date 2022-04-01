export interface IShow {
  _id: string;
  name: string;
  main: boolean;
  posters: string;
  seasons: ISeason[];
  last_episode_date: string;
  description: string;
  short_description: string;
  trailers: string[];
  release_date_of: string;
  default_duration: number;
  show_hosts_name: string[];
  categories: ICategory[];
  created_at: string;
  updatedAt: string;
  order: number;
}

export interface ICategory {
  name: string;
  created_at: string;
  _id: string;
}

export interface ISource {
  createdAt: string;
  created_at: string;
  key: string;
  like_count: number;
  main: boolean;
  poster_key: string;
  show_name: string;
  updatedAt: string;
  views_count: number;
  __v: number;
  _id: string;
}

export interface IEpisode {
  created_at: string;
  name: string;
  number: number;
  sources: ISource[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ISeason {
  _id: string;
  number: number;
  name: string;
  episodes: IEpisode[];
  created_at: string;
  __v: number;
}
