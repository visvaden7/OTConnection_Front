import {OttPlatform} from "../assets/enum/OttPlatformEnum.ts";

export interface ItemData {
  ip_id: number,
  title: string,
  genre: string,
  platform: OttPlatform[],
  profile: string,
  type: "ott" | "webtoon"
}

export interface OttItemData extends ItemData {
  type: "ott";
  watch_time: number;
}

export interface WebtoonItemData extends ItemData {
  type: "webtoon";
  view: number;
}

export interface actor {
  person_id: number
  charName: string,
  role: "Acting",
  profile: string
}

export interface trends {
  naver_male_search: number,
  naver_female_search: number,
  naver_10_search_percentage: string,
  naver_20_search_percentage: string,
  naver_30_search_percentage: string,
  naver_40_search_percentage: string,
  naver_50_search_percentage: string
}

export interface season {
  season_name: string,
  season_overview: string,
  episode_count: number,
  release_date: string,
}