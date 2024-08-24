import { createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, fetchComments } from './commentsThunks';
import { PostComment } from '../../../types';

export interface CommentsState {
  commentsData: PostComment[];
  fetchLoading: boolean;
  errorFetching: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

export const initialState: CommentsState = {
  commentsData: [],
  fetchLoading: false,
  errorFetching: false,
  createLoading: false,
  deleteLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
        state.errorFetching = false;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: data }) => {
        state.commentsData = data;
        state.fetchLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
        state.errorFetching = true;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
        state.errorFetching = false;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createLoading = false;
        state.errorFetching = true;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
        state.errorFetching = false;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteLoading = false;
        state.errorFetching = true;
      });
  },
  selectors: {
    selectComments: (state) => state.commentsData,
    selectFetchingComments: (state) => state.fetchLoading,
    selectErrorFetchingComments: (state) => state.errorFetching,
    selectCreateLoadingComment: (state) => state.createLoading,
    selectDeleteLoadingComment: (state) => state.deleteLoading,
  },
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectFetchingComments,
  selectDeleteLoadingComment,
  selectCreateLoadingComment,
  selectErrorFetchingComments,
} = commentsSlice.selectors;
