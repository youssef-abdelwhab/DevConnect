export interface User {
  name: string;
  username: string;
  profile_image: string;
  posts_count: number;
  comments_count: number;
}

export interface ShowPost {
  title: string;
  body: string;
  image: string;
  created_at: string;
  comments_count: number;
  id: number;
  author: Author;
}
export interface Author {
  id: number;
  username: string;
  profile_image: string;
}
export interface UserId {
  id: number;
}

