import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Post} from '../types';

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = postsAdapter.getInitialState({
  loading: false,
});

const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    postsReceived(state, action: PayloadAction<Post[]>) {
      postsAdapter.setAll(state, action.payload);
    },
    postAdded(state, action: PayloadAction<Post>) {
      postsAdapter.addOne(state, action.payload);
    },

    postUpdated(state, action: PayloadAction<Post>) {
      postsAdapter.upsertOne(state, action.payload);
    },
  },
});

export const {postsReceived, postAdded, postUpdated} = postSlice.actions;
export default postSlice.reducer;

export const postsSelectors = postsAdapter.getSelectors<
  (state: any) => typeof initialState
>((state) => state.posts);
