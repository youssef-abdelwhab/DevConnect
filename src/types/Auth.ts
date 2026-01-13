export interface Register {
  formdata: FormData;
  rememberMe: boolean;
}
export interface UserArg {
  user: User;
  token: string;
}
export interface User {
  username: string;
  name: string;
  email: string;
  id: number;
  profile_image: string;
  comments_count: number;
  posts_count: number;
}
