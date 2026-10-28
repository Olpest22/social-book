import {
  createEntityAdapter,
  createSlice,
  nanoid,
  type EntityState,
} from '@reduxjs/toolkit';
import { postRemoved } from '@/entities/post/@x/comment';
import type { Comment } from './types';

// Внутри поста комментарии идут по времени: старые сверху
export const commentsAdapter = createEntityAdapter<Comment>({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export type CommentsState = EntityState<Comment, string>;

const initialState: CommentsState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentAdded: {
      reducer: commentsAdapter.addOne,
      prepare: (payload: { postId: string; text: string }) => ({
        payload: {
          id: nanoid(),
          postId: payload.postId,
          text: payload.text.trim(),
          createdAt: new Date().toISOString(),
        } satisfies Comment,
      }),
    },
    commentRemoved: commentsAdapter.removeOne,
  },
  // Каскадное удаление: один экшен postRemoved обрабатывают оба слайса,
  // поэтому посты и комментарии не расходятся ни на один рендер
  extraReducers: (builder) => {
    builder.addCase(postRemoved, (state, action) => {
      const orphanIds = state.ids.filter(
        (id) => state.entities[id].postId === action.payload,
      );
      commentsAdapter.removeMany(state, orphanIds);
    });
  },
});

export const { commentAdded, commentRemoved } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
