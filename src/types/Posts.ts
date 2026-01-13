export interface Post {
  id: number;
  title: string;
  comments_count: number;
  created_at: string;
  body: string;
  image: string;
  author: Author;
}
export interface Author {
  id: number;
  username: string;
  profile_image: string;
}
export interface PostStite {
  page: number;
  posts: Post[];
  hasMore: boolean;
  loading: boolean;
  error?: string;
}

export interface AddPostArg {
  formData: FormData;
  token: string;
}
export interface EditPostarg {
  IDPOST: number;
  token: string;
  formData: {
    title: string;
    body: string;
  };
}

export interface DeletePostarg {
  IDPOST: number;
  token: string;
}
export interface PostForm {
  title: string;
  body: string;
  image: File | null;
}