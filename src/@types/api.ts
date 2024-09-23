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
