import { FullPost, Post } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deletePost, fetchOnePost, fetchPosts } from './postsThunks';

export interface NewsPortalState {
  postsData: Post[];
  onePost: FullPost | null;
  fetchLoading: boolean;
  oneLoading: boolean;
  isError: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

export const initialState: NewsPortalState = {
  postsData: [],
  onePost: null,
  fetchLoading: false,
  oneLoading: false,
  isError: false,
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
        state.isError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.fetchLoading = false;
        state.postsData = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
        state.isError = true;
      });

    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.oneLoading = true;
        state.isError = false;
        state.onePost = null;
      })
      .addCase(fetchOnePost.fulfilled, (state, { payload: post }) => {
        state.oneLoading = false;
        state.onePost = post;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.oneLoading = false;
        state.isError = true;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.isError = false;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteLoading = false;
        state.isError = true;
      });
  },
  selectors: {
    selectPosts: (state) => state.postsData,
    selectOnePost: (state) => state.onePost,
    selectOneLoading: (state) => state.oneLoading,
    selectFetchLoading: (state) => state.fetchLoading,
    selectIsError: (state) => state.isError,
    selectCreateLoading: (state) => state.createLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectOnePost,
  selectFetchLoading,
  selectOneLoading,
  selectIsError,
  selectCreateLoading,
  selectDeleteLoading,
} = postsSlice.selectors;
