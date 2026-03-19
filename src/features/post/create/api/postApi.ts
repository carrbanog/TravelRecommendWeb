import { AUTH_ENDPOINTS } from "@/shared/api/endpoints";
import { apiClient } from "../../../../shared/api/apiClient";
import type { CreatePostResponse, CreatePost } from "../model/type";

// 게시글 생성과 관련된 API 호출 함수
export const createPostApi = async (
  post: CreatePost,
): Promise<CreatePostResponse | undefined> => {
  if (!post) return;
  const res = await apiClient.post<CreatePost, CreatePostResponse>(
    AUTH_ENDPOINTS.CREATEPOST,
    post,
  );
  return res;
};

// 데이터를 가져오거나, 변경 생성 이 아닌 일회성 액션이므로  query를 사용 안하는게 깔끔
export const uploadImageApi = async (blob: Blob): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("image", blob, "upload.jpg");
  return await apiClient.post<FormData, { url: string }>(
    "/createpost/upload-image",
    formData,
    {
      headers: {
        // 이 부분을 명시적으로 비워두거나 제거해야 브라우저가 boundary를 포함해 자동으로 생성합니다.
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
