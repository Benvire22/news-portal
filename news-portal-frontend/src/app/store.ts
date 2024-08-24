import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // posts: postsSlice,
    // comments:
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;