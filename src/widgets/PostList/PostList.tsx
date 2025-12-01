import React, {Fragment, useCallback, useMemo} from 'react';
import {PostCard} from '@/entities/post/ui/PostCard';
import {CommentList} from '@/widgets/CommentList/ui/CommentList';

import styles from './PostList.module.scss';

interface Props {
  posts: Post[];
}
interface Post {
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}
interface Comment {
  id: number;
  author: string;
  text: string;
}

export const PostList: React.FC<Props> = ({posts}) => {
  const memoPosts = useMemo(() => posts, [posts]);

  const renderPost = useCallback((post: Post) => {
    return (
      <Fragment key={post.id}>
        <div className={styles.cardWrapper}>
          <PostCard title={post.title} body={post.body} />
          <div className={styles.comments}>
            <CommentList comments={post.comments ?? []} />
          </div>
        </div>
      </Fragment>
    );
  }, []);

  return <div className={styles.list}>{memoPosts.map(renderPost)}</div>;
};
