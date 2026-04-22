// post 타입은 shared로 이동
export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  thumbnail?: string; // 본문에서 첫 번째 이미지 URL을 저장하는 필드
  // images?: File[];
};

//게시글 생성 시 서버로 보낼 데이터
export type CreatePost = Omit<Post, "_id" | "createdAt">;

//서버에서 게시글 생성 후 반환 타입
export type CreatePostResponse = {
  message?: string;
  data: Post;
};
