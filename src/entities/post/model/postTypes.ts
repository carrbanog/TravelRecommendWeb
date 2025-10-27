export type Post = {
  title: string;
  content: string;
  author?: string;
}

export type CreatePostResponse = {
  message?: string;
  data: Post;
}