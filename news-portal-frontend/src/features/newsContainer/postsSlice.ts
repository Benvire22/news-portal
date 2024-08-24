import { FullPost, Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deletePost, fetchOnePost, fetchPosts } from './postsThunks';

export interface NewsPortalState {
  postsData: Post[];
  onePost: FullPost | null;
  fetchLoading: boolean;
  errorFetching: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

export const initialState: NewsPortalState = {
  postsData: [],
  onePost: null,
  fetchLoading: false,
  errorFetching: false,
  createLoading: false,
  deleteLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchLoading = true;
        state.errorFetching = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.fetchLoading = false;
        state.postsData = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
        state.errorFetching = true;
      });

    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.fetchLoading = true;
        state.errorFetching = false;
        state.onePost = null;
      })
      .addCase(fetchOnePost.fulfilled, (state, { payload: post }) => {
        state.fetchLoading = false;
        state.onePost = post;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.fetchLoading = false;
        state.errorFetching = true;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.errorFetching = false;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteLoading = false;
        state.errorFetching = true;
      });
  },
  selectors: {
    selectPosts: (state) => state.postsData,
    selectOnePost: (state) => state.onePost,
    selectFetchLoading: (state) => state.fetchLoading,
    selectErrorFetching: (state) => state.errorFetching,
    selectCreateLoading: (state) => state.createLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectOnePost,
  selectFetchLoading,
  selectErrorFetching,
  selectCreateLoading,
  selectDeleteLoading,
} = postsSlice.selectors;
