// src/entities/post/ui/PostCard.tsx
import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react"; // 상세페이지와 아이콘 통일
import { Card, CardContent } from "@/components/ui/card";

interface PostCardProps {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  createdAt?: string;
}
// 인기글 카드 컴포넌트: 이미지, 제목, 작성자, 작성일 표시
export const PopularPostCard = ({
  id,
  title,
  author,
  createdAt,
  thumbnail,
}: PostCardProps) => {
  return (
    <Link to={`/post/${id}`} className="group block h-full">
      <Card className="overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <img
              src={thumbnail}
              alt={`${title} 썸네일`}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/api/placeholder/400/400";
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium px-4 py-2 border border-white rounded-full backdrop-blur-sm">
                읽어보기
              </span>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <header>
              <h3 className="font-bold text-slate-800 text-lg line-clamp-2 group-hover:text-sky-600 transition-colors mb-3">
                {title}
              </h3>
            </header>

            <footer className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <div className="p-1 rounded-full bg-slate-100">
                  <User className="w-3 h-3" />
                </div>
                <span className="truncate max-w-[100px]">{author}</span>
              </div>

              {createdAt && (
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={new Date(createdAt).toISOString()}>
                    {new Date(createdAt).toLocaleDateString()}
                  </time>
                </div>
              )}
            </footer>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
