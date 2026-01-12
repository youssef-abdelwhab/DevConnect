export interface Portfilo{
   IDUseer:number
}
export interface PortfiloSliceType{
    posts :Post[],
    user:{},
    loadingUser: boolean,
    loadingPosts: boolean,
    error:string | null,
}
export interface Author {
  username: string;
  profile_image: string;
}

export interface Post {
  id: number;
  title: string;
  comments_count: number;
  created_at: string;
  body: string;
  image: string;
  author: Author;
  error:string|null
}


