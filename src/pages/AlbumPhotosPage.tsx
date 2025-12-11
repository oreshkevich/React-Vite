import React from 'react';
import {useParams} from 'react-router-dom';

export const AlbumPhotosPage: React.FC = () => {
  const {id} = useParams<{id: string}>();
  return <div>Фотографии альбома с ID: {id}</div>;
};
