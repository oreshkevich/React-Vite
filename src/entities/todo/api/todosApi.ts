import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Todo} from '@/entities/todo/model/types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  tagTypes: ['Todo', 'UserTodos'],
  endpoints: (builder) => ({
    getTodosByUser: builder.query<Todo[], number>({
      query: (userId) => `/todos?userId=${userId}`,
      providesTags: (res, err, userId) =>
        res
          ? [
              ...res.map((t) => ({type: 'Todo' as const, id: t.id})),
              {type: 'UserTodos' as const, id: userId},
            ]
          : [{type: 'UserTodos' as const, id: userId}],
    }),
    toggleTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (res, err, {id}) => [{type: 'Todo', id}],
    }),
  }),
});

export const {useGetTodosByUserQuery, useToggleTodoMutation} = todosApi;
