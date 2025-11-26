import {PostCard} from '@/entities/post/ui/PostCard';
import {Fragment} from 'react';
interface Post {
  id: number;
  title: string;
  body: string;
}

const posts: Post[] = [
  {id: 1, title: 'Первый пост', body: 'Текст первого поста'},
  {id: 2, title: 'Второй пост', body: 'Текст второго поста'},
  {id: 3, title: 'Третий пост', body: 'Текст третьего поста'},
];

export const PostList: React.FC = () => {
  return (
    <div style={{display: 'grid', gap: 16}}>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <PostCard title={post.title} body={post.body} />
        </Fragment>
      ))}
    </div>
  );
};
