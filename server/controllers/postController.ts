import { Request, Response } from "express";
import { Post } from "../models/Post";

export const getAllPosts =  async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({createdAt: -1});
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}



