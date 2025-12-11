import {configureStore} from '@reduxjs/toolkit';
import {postsApi} from '@/entities/post/api/postsApi';
import {commentsApi} from '@/entities/comment/api/commentsApi';
import {albumsApi} from '@/entities/album/api/albumsApi';
import {todosApi} from '@/entities/todo/api/todosApi';
import postReducer from '@/entities/post/model/slice/postSlice';
import userReducer from '@/entities/user/model/slice/userSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      commentsApi.middleware,
      albumsApi.middleware,
      todosApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
