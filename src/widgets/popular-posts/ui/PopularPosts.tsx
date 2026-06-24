import { usePopularPosts } from "../../../entities/post/model/usePopularPosts";
import { PopularPostCard } from "../../../entities/post/ui/PopularPostCard";

// 메인 페이지에서 인기 여행지를 보여주는 컴포넌트
// 지금은 게시글 4개 순서대로 보여주지만 나중에 인기글 기준이 생기면 usePopularPosts 훅과 fetchPopularPosts API를 수정해서 반영할 예정입니다.
export const PopularPosts = () => {
  const { data: popularPosts, isLoading, error } = usePopularPosts();
  console.log("🔥 인기 여행기 데이터:", popularPosts);
  if (isLoading) return <div>인기 여행지 불러오는 중...</div>;
  if (error) return <div>인기 여행지를 불러오지 못했습니다.</div>;
  return (
    <section className="max-w-screen-xl mx-auto my-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center my-4">
        🔥 실시간 인기 여행기
      </h2>

      {/* 💡 여행지 데이터가 없을 경우 (빈 배열인 경우) 예외 처리 추가 */}
      {!popularPosts || popularPosts.length === 0 ? (
        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-xl">
          <p className="text-lg font-medium">
            아직 등록된 인기 여행기가 없습니다.
          </p>
          <p className="text-sm text-slate-400 mt-1">
            첫 번째 여행기의 주인공이 되어보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPosts.map((post) => (
            <PopularPostCard
              key={post._id}
              id={post._id}
              title={post.title}
              thumbnail={post.thumbnail}
              author={post.author}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      )}
    </section>
  );
};
