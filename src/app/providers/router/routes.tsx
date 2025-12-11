import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {PostsPage} from '@/pages/PostsPage';
import {PostDetailsPage} from '@/pages/PostDetailsPage';
import {UserAlbumsPage} from '@/pages/UserAlbumsPage';
import {AlbumPhotosPage} from '@/pages/AlbumPhotosPage';
import {UserTodosPage} from '@/pages/UserTodosPage';
import {UserPostsPage} from '@/pages/UserPostsPage';
import {MainLayout} from '@/shared/layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: 'posts', element: <PostsPage />},
      {path: 'posts/:id', element: <PostDetailsPage />},
      {path: 'users/:id/albums', element: <UserAlbumsPage />},
      {path: 'albums/:id/photos', element: <AlbumPhotosPage />},
      {path: 'users/:id/todos', element: <UserTodosPage />},
      {path: 'users/:id/posts', element: <UserPostsPage />},
    ],
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
