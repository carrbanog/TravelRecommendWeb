import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// 1. 댓글 인터페이스 정의
export interface IComment extends Document {
  id: string;        // 댓글 고유의 커스텀 ID
  postId: string;    // 어떤 게시글에 달린 댓글인지 구분하는 ID (Post의 id와 연결)
  content: string;   // 댓글 내용
  author: string;    // 작성자 이메일
  createdAt: Date;   // 생성일
}

// 2. 댓글 스키마 정의
const CommentSchema: Schema = new Schema({
  // 댓글 자체의 고유 ID (uuid 사용)
  commentId: { 
    type: String, 
    default: uuidv4 
  },
  // 대상 게시글 ID (이 필드를 통해 특정 포스트의 댓글만 필터링합니다)
  postId: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// 3. 모델 익스포트
export const Comment = mongoose.model<IComment>("Comment", CommentSchema);