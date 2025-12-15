import React, {useEffect, useState, ChangeEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ItemList} from '@/shared/ui/ItemList/ItemList';
import type {User} from '@/entities/user/model/types';
import {
  usersSelectors,
  userAdded,
  userUpdated,
  userRemoved,
  setLoading,
} from '@/entities/user/model/slice/userSlice';
import type {RootState, AppDispatch} from '@/app/providers/store/store';
import styles from './UsersPanel.module.scss';

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
  }, [dispatch, users.length]);

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

  const handleUpdate = (user: User) => {
    dispatch(userUpdated({...user, name: user.name + ' ✨'}));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <section className={styles.panel}>
      <h3>Users (userSlice)</h3>

      <div className={styles.controls}>
        <input
          type='text'
          value={name}
          onChange={handleChange}
          placeholder='Имя пользователя'
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      {loading && <div>Loading...</div>}

      <ItemList<User>
        items={users}
        renderItem={(user) => (
          <div key={user.id} className={styles.userItem}>
            <span>
              {user.name} ({user.username})
            </span>
            <div className={styles.actions}>
              <button onClick={() => handleRemove(user.id)}>Удалить</button>
              <button onClick={() => handleUpdate(user)}>Апдейт</button>
            </div>
          </div>
        )}
      />
    </section>
  );
};
