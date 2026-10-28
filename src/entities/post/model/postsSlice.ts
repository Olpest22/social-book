import {
  createEntityAdapter,
  createSlice,
  nanoid,
  type EntityState,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Post } from './types';

// Нормализованное хранилище постов: { ids: [], entities: {} }.
// Новые посты — сверху.
export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export type PostsState = EntityState<Post, string>;

const initialState: PostsState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // prepare формирует id и дату вне редьюсера, чтобы редьюсер оставался чистой функцией
    postAdded: {
      reducer: postsAdapter.addOne,
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text: text.trim(),
          createdAt: new Date().toISOString(),
        } satisfies Post,
      }),
    },
    postUpdated(state, action: PayloadAction<{ id: string; text: string }>) {
      const { id, text } = action.payload;
      postsAdapter.updateOne(state, { id, changes: { text: text.trim() } });
    },
    postRemoved: postsAdapter.removeOne,
  },
});

export const { postAdded, postUpdated, postRemoved } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
