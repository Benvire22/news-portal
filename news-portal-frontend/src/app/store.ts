import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/newsContainer/postsSlice';
import { commentsReducer } from '../features/newsContainer/OnePost/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
