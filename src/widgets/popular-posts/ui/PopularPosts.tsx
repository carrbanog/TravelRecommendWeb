import React from "react";
import { usePopularPosts } from "../../../entities/post/model/usePopularPosts";
import { PopularPostCard } from "../../../entities/post/ui/PopularPostCard";

// 메인 페이지에서 인기 여행지를 보여주는 컴포넌트
// 지금은 게시글 4개 순서대로 보여주지만 나중에 인기글 기준이 생기면 usePopularPosts 훅과 fetchPopularPosts API를 수정해서 반영할 예정입니다.
export const PopularPosts = () => {
  const { data: popularPosts, isLoading, error } = usePopularPosts();

  if (isLoading) return <div>인기 여행지 불러오는 중...</div>;
  if (error) return <div>인기 여행지를 불러오지 못했습니다.</div>;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center my-4">
        🔥 실시간 인기 여행기
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularPosts?.map((post) => (
          <PopularPostCard
            key={post._id}
            id={post._id}
            title={post.title}
            // thumbnail={extractFirstImageUrl(post.content)}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </section>
  );
};
