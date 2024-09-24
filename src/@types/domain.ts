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
  naver_10_search_percentage: number,
  naver_20_search_percentage: number,
  naver_30_search_percentage: number,
  naver_40_search_percentage: number,
  naver_50_search_percentage: number
}

export interface season {
  season_name: string,
  season_overview: string,
  episode_count: number,
  release_date: string,
}

export type VInfo = {
  virtual_casting_title: string;
  virtual_casting_image_url: string;
  char_main: string;
  char_main_url: string;
  char_sub1: string;
  char_sub1_url: string;
  char_sub2: string;
  char_sub2_url: string;
  char_sub3: string;
  char_sub3_url: string;
};

export type IPInfo = {
  title: string;                     // IP 제목
  webtoon_title: string;             // 웹툰 제목
  webtoon_platform: string;          // 웹툰 플랫폼 (ex. 카카오)
  webtoon_start_date: string;        // 웹툰 연재 시작일 (ISO 날짜 형식)
  webtoon_end_date: string | null;   // 웹툰 연재 종료일 (null 허용)
  total_views: number;               // 총 조회수
  rating: number;                    // 웹툰 평점
  release_date: string;              // 드라마 개봉일 (ISO 날짜 형식)
  watch_time: number;                // 총 시청 시간 (초 단위)
  imdb_rating: number;               // IMDb 평점
  webtoon_highlight: string[];       // 웹툰 하이라이트 (배열)
  ott_highlight: string[];           // OTT 하이라이트 (배열)
  diff_ott_webtoon: string[];        // 웹툰과 드라마의 차이점 (배열)
  compare_youtube_url: string;       // 비교 유튜브 URL
};

export interface VirtualCastingPost {
  post_id: number;
  ip_id: number;
  type: string;
  virtual_casting_title: string;
  virtual_casting_image_url: string;
  char_main: string;
  char_main_url: string;
  char_sub1: string;
  char_sub1_url: string;
  char_sub2: string;
  char_sub2_url: string;
  char_sub3: string;
  char_sub3_url: string;
  actor_main_casting1: string;
  actor_main_casting1_recommend: number;
  actor_main_casting1_url: string;
  actor_main_casting2: string;
  actor_main_casting2_recommend: number;
  actor_main_casting2_url: string;
  actor_sub1_casting1: string;
  actor_sub1_casting1_recommend: number;
  actor_sub1_casting1_url: string;
  actor_sub1_casting2: string;
  actor_sub1_casting2_recommend: number;
  actor_sub1_casting2_url: string;
  actor_sub2_casting1: string;
  actor_sub2_casting1_recommend: number;
  actor_sub2_casting1_url: string;
  actor_sub2_casting2: string;
  actor_sub2_casting2_recommend: number;
  actor_sub2_casting2_url: string;
  actor_sub3_casting1: string;
  actor_sub3_casting1_recommend: number;
  actor_sub3_casting1_url: string;
  actor_sub3_casting2: string;
  actor_sub3_casting2_recommend: number;
  actor_sub3_casting2_url: string;
}
