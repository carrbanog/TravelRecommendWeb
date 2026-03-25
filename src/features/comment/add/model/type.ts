import type { Comment } from "@/entities/comment/model/type";

export type CreateCommentRequest = {
  content: string;
  author: string;
}

export type CommentResponse = Comment