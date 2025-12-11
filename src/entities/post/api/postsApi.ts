// src/entities/post/api/postsApi.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Post} from '@/entities/post/model/types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  tagTypes: ['Post', 'UserPosts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({id}) => ({type: 'Post' as const, id})),
              {type: 'Post', id: 'LIST'},
            ]
          : [{type: 'Post', id: 'LIST'}],
      // keep in cache for 60s
      keepUnusedDataFor: 60,
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{type: 'Post', id}],
    }),
    getPostsByUser: builder.query<Post[], number>({
      query: (userId) => `/posts?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map((p) => ({type: 'Post' as const, id: p.id})),
              {type: 'UserPosts' as const, id: userId},
            ]
          : [{type: 'UserPosts' as const, id: userId}],
      keepUnusedDataFor: 30,
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({url: '/posts', method: 'POST', body}),
      invalidatesTags: [{type: 'Post', id: 'LIST'}],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Post', id}],
    }),
    deletePost: builder.mutation<{success: boolean; id: number}, number>({
      query: (id) => ({url: `/posts/${id}`, method: 'DELETE'}),
      invalidatesTags: (result, error, id) => [
        {type: 'Post', id},
        {type: 'Post', id: 'LIST'},
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
