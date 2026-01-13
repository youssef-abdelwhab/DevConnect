export interface FetchCommentsArg {
  body: string;
  id: number;
  author: {
    profile_image: string;
    name: string;
  };
}
export interface AddComment {
  id: number;
  body: string;
  token: string;
}