import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postsSelectors, postAdded} from '@/entities/post/model/slice/postSlice';
import {useGetPostsQuery} from '@/entities/post/api/postsApi';
import type {RootState, AppDispatch} from '@/app/providers/store/store';

export const PostsPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postsFromSlice = useSelector((s: RootState) =>
    postsSelectors.selectAll(s)
  );
  const {data: postsFromApi, isLoading} = useGetPostsQuery();

  const handleAddLocal = () => {
    const id = Date.now();
    dispatch(postAdded({id, title: 'Local post ' + id, body: '...'}));
  };

  return (
    <section>
      <h3>Posts</h3>
      <div>
        <button onClick={handleAddLocal}>
          Добавить локальный пост в postSlice
        </button>
      </div>

      <h4>Из postSlice (adapter)</h4>
      <ul>
        {postsFromSlice.map((p) => (
          <li key={p.id}>
            {p.title} ({p.id})
          </li>
        ))}
      </ul>

      <h4>Из postsApi (RTK Query)</h4>
      {isLoading ? (
        <div>Загрузка API...</div>
      ) : (
        <ul>
          {postsFromApi?.slice(0, 10).map((p) => (
            <li key={p.id}>
              {p.title} ({p.id})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
