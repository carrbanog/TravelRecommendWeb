// post 타입은 shared로 이동
export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  // images?: File[];
};

//게시글 생성 시 서버로 보낼 데이터
export type CreatePost = Omit<Post, "_id" | "createdAt">;

//서버에서 게시글 생성 후 반환 타입
export type CreatePostResponse = {
  message?: string;
  data: Post;
};
