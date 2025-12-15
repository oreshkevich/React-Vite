import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  usersSelectors,
  userAdded,
  userUpdated,
  userRemoved,
  setLoading,
} from '@/entities/user/model/slice/userSlice';
import type {RootState, AppDispatch} from '@/app/providers/store/store';

export const UsersPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((s: RootState) => usersSelectors.selectAll(s));
  const loading = useSelector((s: RootState) => s.users.loading);

  const [name, setName] = useState('');

  useEffect(() => {
    if (users.length === 0) {
      dispatch(setLoading(true));
      setTimeout(() => dispatch(setLoading(false)), 500);
    }
  }, []);

  const handleAdd = () => {
    const id = Date.now();
    dispatch(
      userAdded({id, name: name || `User ${id}`, username: `u${id}`, email: ''})
    );
    setName('');
  };

  const handleRemove = (id: number) => {
    dispatch(userRemoved(id));
  };

  return (
    <section>
      <h3>Users (userSlice)</h3>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Имя пользователя'
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      {loading ? <div>Loading...</div> : null}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <b>{u.name}</b> — <small>{u.username}</small>
            <button onClick={() => handleRemove(u.id)}>Удалить</button>
            <button
              onClick={() =>
                dispatch(userUpdated({...u, name: u.name + ' ✨'}))
              }
            >
              Апдейт
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
