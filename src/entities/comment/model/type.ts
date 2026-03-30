export type Comment = {
  commentId: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export type DeleteResponse = {
  message: string;
  content: string;
}