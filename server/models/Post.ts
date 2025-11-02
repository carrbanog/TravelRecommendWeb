import mongoose, { Schema, Document } from "mongoose";
import {v4 as uuidv4} from "uuid";

export interface IPost extends Document {
  id: string; // 커스텀 id
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  id: {type: String, deafult: uuidv4 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author:{type:String, reqired:true},
  createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
