import React from 'react';
import {useParams} from 'react-router-dom';

export const PostDetailsPage: React.FC = () => {
  const {id} = useParams<{id: string}>();
  return <div>Детали поста: {id}</div>;
};
