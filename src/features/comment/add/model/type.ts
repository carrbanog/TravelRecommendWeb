export type Comment = {
  _id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export type CreateCommentRequest = {
  content: string;
  author: string;
}

export type CommentResponse = Comment