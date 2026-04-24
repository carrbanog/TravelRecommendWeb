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
export const PopularPostCard = ({ id, title, author, createdAt, thumbnail }: PostCardProps) => {
  return (
    <Link to={`/post/${id}`} className="group block h-full">
      {/* 1. aspect-[3/4]를 제거하고 h-full을 주어 부모 그리드 높이에 맞춥니다. */}
      <Card className="overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          
          {/* 2. 이미지 영역 비율 조정: aspect-[4/3] -> aspect-square (1:1) 또는 aspect-[4/5] */}
          {/* 이미지를 더 크게 보고 싶다면 aspect-square를 추천합니다. */}
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/api/placeholder/400/400";
              }}
            />
            {/* 호버 오버레이 */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-medium px-4 py-2 border border-white rounded-full backdrop-blur-sm">
                읽어보기
              </span>
            </div>
          </div>

          {/* 3. 텍스트 정보 영역: flex-1과 flex flex-col을 주어 공간을 균등 배분 */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* truncate 대신 line-clamp-2를 써서 제목이 길면 두 줄까지 보여주면 세로가 더 꽉 찹니다. */}
              <h3 className="font-bold text-slate-800 text-lg line-clamp-2 group-hover:text-sky-600 transition-colors mb-3">
                {title}
              </h3>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <div className="p-1 rounded-full bg-slate-100">
                  <User className="w-3 h-3" />
                </div>
                <span className="truncate max-w-[100px]">{author}</span>
              </div>
              
              {createdAt && (
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};