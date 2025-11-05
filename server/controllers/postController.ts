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


export const getPostById = async(req:Request, res:Response) => {
  try{
    const {id} = req.params;
    const post = await Post.findById(id);

    if(!post) return res.status(404).json({message: "게시글을 찾을 수 없습니다."});
    res.status(200).json(post);
  }catch(error){
    res.status(500).json({message: "오류 발생", error});
  }
}