
import { Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

export interface GuestbookState {
  postsData: Post[];
  fetchLoading: boolean;
  errorFetching: boolean;
  createLoading: boolean;
}

export const initialState: GuestbookState = {
  postsData: [],
  fetchLoading: false,
  errorFetching: false,
  createLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  selectors: {
    selectPosts: (state) => state.postsData,
    selectFetchLoading: (state) => state.fetchLoading,
    selectErrorFetching: (state) => state.errorFetching,
    selectCreateLoading: (state) => state.createLoading,
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectFetchLoading,
  selectErrorFetching,
  selectCreateLoading,
} = postsSlice.selectors;