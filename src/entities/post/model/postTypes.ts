//서버에 저장된 게시글 데이터
export type Post = {
  _id: string;
  id: string; //서버에서 생성한 커스텀 uuid 필드
  title: string;
  content: string;
  author: string;
  createdAt: string;
  thumbnail: string; // 게시글 대표 이미지 URL
  // images?: File[];
};
