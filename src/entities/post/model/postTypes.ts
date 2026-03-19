//서버에 저장된 게시글 데이터
export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  // images?: File[];
};
