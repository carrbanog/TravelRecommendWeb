export type Post = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export type CreatePostResponse = {
  message?: string;
  data: Post;
}