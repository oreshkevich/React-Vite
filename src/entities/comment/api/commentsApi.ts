// src/entities/comment/api/commentsApi.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Comment} from '@/entities/post/model/types';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  tagTypes: ['Comment', 'PostComments'],
  endpoints: (builder) => ({
    getCommentsByPost: builder.query<Comment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map((c) => ({type: 'Comment' as const, id: c.id})),
              {type: 'PostComments', id: postId},
            ]
          : [{type: 'PostComments', id: postId}],
      keepUnusedDataFor: 30,
    }),
    addComment: builder.mutation<Comment, Partial<Comment> & {postId: number}>({
      query: ({postId, ...body}) => ({
        url: `/comments`,
        method: 'POST',
        body: {postId, ...body},
      }),
      invalidatesTags: (result, error, {postId}) => [
        {type: 'PostComments', id: postId},
      ],
    }),
  }),
});

export const {useGetCommentsByPostQuery, useAddCommentMutation} = commentsApi;
