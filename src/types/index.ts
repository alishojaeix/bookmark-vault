export interface Bookmark {
  id?: number;
  url: string;
  title?: string;
  description?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBookmarkDto {
  url: string;
  title?: string;
  description?: string;
  tags?: string;
}

export interface UpdateBookmarkDto {
  title?: string;
  description?: string;
  tags?: string;
}

export interface QueryBookmarkDto {
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
}