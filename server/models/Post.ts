import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPost extends Document {
  id: string; // 커스텀 id
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  thumbnail?: string; // 본문에서 첫 번째 이미지 URL을 저장하는 필드
}

const PostSchema: Schema = new Schema({
  id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  thumbnail: { type: String }, // 본문에서 첫 번째 이미지 URL을 저장하는 필드
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
