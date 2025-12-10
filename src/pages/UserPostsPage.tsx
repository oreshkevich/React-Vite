import React, {useState, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {UserTabs} from '@/widgets/UserTabs/UserTabs';
import {PostLengthFilter} from '@/features/PostLengthFilter/ui/PostLengthFilter';
import {filterByLength} from '@/features/PostLengthFilter/lib/filterByLength';
import {PostListWithLoading} from '@/widgets/PostList';
import {usePosts} from '@/features/PostList/model/hooks/usePosts';

export const UserPostsPage: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [minLen, setMinLen] = useState(0);

  const {posts, isLoading} = usePosts();

  const userPosts = useMemo(
    () => posts.filter((post) => String(post.userId) === id),
    [posts, id]
  );

  const filteredPosts = useMemo(
    () => filterByLength(userPosts, minLen),
    [userPosts, minLen]
  );

  return (
    <div>
      <UserTabs userId={id!} />

      <PostLengthFilter value={minLen} onChange={setMinLen} />

      <PostListWithLoading isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
};
