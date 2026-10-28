import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { postRemoved } from '@/entities/post';

export interface CommentsVisibilityState {
  /** id постов с раскрытыми комментариями. Словарь, а не массив: проверка за O(1) */
  expanded: Record<string, true>;
}

const initialState: CommentsVisibilityState = { expanded: {} };

const commentsVisibilitySlice = createSlice({
  name: 'commentsVisibility',
  initialState,
  reducers: {
    commentsShown(state, action: PayloadAction<string>) {
      state.expanded[action.payload] = true;
    },
    commentsHidden(state, action: PayloadAction<string>) {
      delete state.expanded[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRemoved, (state, action) => {
      delete state.expanded[action.payload];
    });
  },
  selectors: {
    selectAreCommentsShown: (state, postId: string) =>
      Boolean(state.expanded[postId]),
  },
});

export const { commentsShown, commentsHidden } = commentsVisibilitySlice.actions;
export const { selectAreCommentsShown } = commentsVisibilitySlice.selectors;
export const commentsVisibilityReducer = commentsVisibilitySlice.reducer;
