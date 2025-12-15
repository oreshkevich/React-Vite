import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User} from '../types';

const usersAdapter = createEntityAdapter<User>({
  selectId: (u) => u.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = usersAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersReceived(state, action: PayloadAction<User[]>) {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
      state.error = null;
    },
    userAdded(state, action: PayloadAction<User>) {
      usersAdapter.addOne(state, action.payload);
    },
    userUpdated(state, action: PayloadAction<User>) {
      usersAdapter.upsertOne(state, action.payload);
    },
    userRemoved(state, action: PayloadAction<number>) {
      usersAdapter.removeOne(state, action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearUsers(state) {
      usersAdapter.removeAll(state);
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  usersReceived,
  userAdded,
  userUpdated,
  userRemoved,
  setLoading,
  setError,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<
  (state: any) => typeof initialState
>((state) => state.users);

export const selectAllUsers = (state: any) => usersSelectors.selectAll(state);
export const selectUserById = (state: any, id: number) =>
  usersSelectors.selectById(state, id);
export const selectUsersLoading = (state: any) => state.users?.loading ?? false;
export const selectUsersError = (state: any) => state.users?.error ?? null;
