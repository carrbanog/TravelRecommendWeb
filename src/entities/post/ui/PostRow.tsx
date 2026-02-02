import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@/components/ui/table";
import { CalendarDays, User } from "lucide-react";

import type { Post } from "../model/postTypes";
interface PostRowProps {
  post: Post;
}

// 포스트 한 줄 컴포넌트
const PostRow = ({ post }: PostRowProps) => {
  const navigate = useNavigate();
  return (
    <TableRow
      key={post._id}
      onClick={() => navigate(`/post/${post._id}`)}
      className="group cursor-pointer border-b-gray-50 hover:bg-sky-50/60 transition-colors duration-200"
    >
      {/* 제목 컬럼 */}
      <TableCell className="pl-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700 group-hover:text-sky-700 transition-colors truncate max-w-[200px] md:max-w-md">
            {post.title}
          </span>
        </div>
      </TableCell>

      {/* 작성자 컬럼 */}
      <TableCell className="text-center py-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-sm">
          <User className="w-3 h-3 text-gray-400" />
          {post.author}
        </div>
      </TableCell>

      {/* 작성일 컬럼 */}
      <TableCell className="text-right pr-6 py-4">
        <div className="flex items-center justify-end gap-1 text-gray-400 text-sm font-light">
          <CalendarDays className="w-3 h-3" />
          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;
