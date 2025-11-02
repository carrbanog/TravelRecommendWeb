
//서버에 저장된 게시글 데이터
export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

//게시글 생성 시 서버로 보낼 데이터
export type CreatePost = Omit<Post, "id" | "createdAt">


//서버에서 게시글 생성 후 반환 타입
export type CreatePostResponse = {
  message?: string;
  data: Post;
}