import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Album, Photo} from '@/entities/album/model/types';

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  tagTypes: ['Album', 'AlbumPhotos', 'UserAlbums'],
  endpoints: (builder) => ({
    getAlbumsByUser: builder.query<Album[], number>({
      query: (userId) => `/albums?userId=${userId}`,
      providesTags: (res, err, userId) =>
        res
          ? [
              ...res.map((a) => ({type: 'Album' as const, id: a.id})),
              {type: 'UserAlbums' as const, id: userId},
            ]
          : [{type: 'UserAlbums' as const, id: userId}],
    }),
    getPhotosByAlbum: builder.query<Photo[], number>({
      query: (albumId) => `/albums/${albumId}/photos`,
      providesTags: (res, err, albumId) =>
        res
          ? [
              ...res.map((p) => ({type: 'AlbumPhotos' as const, id: p.id})),
              {type: 'AlbumPhotos' as const, id: albumId},
            ]
          : [{type: 'AlbumPhotos' as const, id: albumId}],
    }),
  }),
});

export const {useGetAlbumsByUserQuery, useGetPhotosByAlbumQuery} = albumsApi;
