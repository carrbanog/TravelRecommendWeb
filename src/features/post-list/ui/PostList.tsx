import React from 'react'
import {useQuery} from '@tanstack/react-query'

import {fetchPosts} from "../../../entities/post/api/postApi";
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const navigate = useNavigate();
  // const {data: posts, isLoading, error} = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchPosts,
  // })
  // console.log(posts, isLoading, error)
  return (
    <div>
      <h2>전체 게시글</h2>
      <ul>
        <li>여기는 제목입니다.</li>
      </ul>
      <button onClick={() => navigate("/post/create")}>새 게시글 작성</button>
    </div>
  )
}

export default PostList
