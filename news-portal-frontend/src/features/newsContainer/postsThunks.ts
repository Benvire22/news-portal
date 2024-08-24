import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { FullPost, Post, PostMutation } from '../../types';


export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    const { data: posts } = await axiosApi.get<Post[] | null>('/news');

    if (!posts) {
      return [];
    }

    return posts;
  },
);

export const fetchOnePost = createAsyncThunk(
  'posts/fetchOne',
  async (postId: string) => {
    const { data: post } = await axiosApi.get<FullPost | null>(`/news/${postId}`);

    if (!post) {
      return null;
    }

    return post;
  },
);

export const createPost = createAsyncThunk<void, PostMutation>(
  'posts/create',
  async (postMutation) => {
    const formData = new FormData();

    formData.append('title', postMutation.title);
    formData.append('description', postMutation.description);

    if (postMutation.image) {
      formData.append('image', postMutation.image);
    }

    await axiosApi.post('/news', formData);
  },
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: string) => {
    await axiosApi.delete(`/news/${postId}`);
  },
);