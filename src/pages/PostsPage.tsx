import React, {useMemo, useState, useEffect} from 'react';
import {ThemeSwitcher} from '@/features/ThemeSwitcher/ui/ThemeSwitcher';
import {PostLengthFilter} from '@/features/PostLengthFilter/ui/PostLengthFilter';
import {filterByLength} from '@/features/PostLengthFilter/lib/filterByLength';
import {Button} from '@/shared/ui/Button/Button';
import {Modal} from '@/shared/ui/Modal';
import {PostListWithLoading} from '@/widgets/PostList';

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

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    title: 'Короткий',
    body: 'Тело поста 1',
    comments: [
      {id: 11, author: 'Иван', text: 'Первый коммент'},
      {id: 12, author: 'Оля', text: 'Второй коммент'},
    ],
  },
  {
    id: 2,
    title: 'Длинный заголовок поста второй',
    body: 'Тело поста 2',
    comments: [{id: 21, author: 'Петя', text: 'Комментарий'}],
  },
  {
    id: 3,
    title: 'Средний заголовок',
    body: 'Тело поста 3',
  },
];

export const PostsPage: React.FC = () => {
  const [minLen, setMinLen] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => filterByLength(SAMPLE_POSTS, minLen),
    [minLen]
  );

  return (
    <>
      <ThemeSwitcher />

      <div style={{display: 'flex', gap: 12, marginBottom: 10}}>
        <PostLengthFilter value={minLen} onChange={setMinLen} />
        <Button onClick={() => setOpen(true)}>О проекте</Button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Header>О проекте</Modal.Header>
        <Modal.Body>
          <p>Модального окна с использованием compound components</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

      <PostListWithLoading isLoading={loading} posts={filtered} />
    </>
  );
};
