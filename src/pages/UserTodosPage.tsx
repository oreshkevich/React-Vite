import React from 'react';
import {useParams} from 'react-router-dom';

export const UserTodosPage: React.FC = () => {
  const {id} = useParams<{id: string}>();
  return <div>Задачи пользователя с ID: {id}</div>;
};
