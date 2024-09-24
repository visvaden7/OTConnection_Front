import {Nullable} from "./global.ts";

export interface ResponseCheckFavorite {
  count: number;
  active: boolean;
}

export interface ResponseCommentList {
  id: number,
  com_id: number,
  user_id: number,
  post_id: number,
  parent_id: Nullable<number>,
  avatarUrl: string,
  fullName: string,
  text: string,
  createdAt: string,
  replies: string,
}

export interface ResponseCompareInfoList {
  title: string,
  webtoon_title: string,
  webtoon_platform: string,
  webtoon_start_date: string,
  webtoon_end_date: string,
  total_views: number,
  rating: number,
  release_date: string,
  watch_time: number,
  imdb_rating: number,
  webtoon_highlight: string[],
  ott_highlight: string[],
  diff_ott_webtoon: string[],
  compare_youtube_url: string
}