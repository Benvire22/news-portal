import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { PostComment, PostCommentMutation } from '../../../types';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (id: string) => {
    const { data: posts } = await axiosApi.get<PostComment[] | null>(
      `/comments?postId=${id}`,
    );

    if (!posts) {
      return [];
    }

    return posts;
  },
);

export const createComment = createAsyncThunk<void, PostCommentMutation>(
  'comments/create',
  async (comment) => {
    await axiosApi.post('/comments', comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: string) => {
    await axiosApi.delete(`/comments/${commentId}`);
  },
);
