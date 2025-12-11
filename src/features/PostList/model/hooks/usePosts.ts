import {useEffect, useState} from 'react';

export interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  text: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (e) {
        console.error('Ошибка загрузки постов', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return {posts, isLoading};
};
