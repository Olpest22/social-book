import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { postRemoved, postUpdated } from '@/entities/post';

export interface EditPostState {
  /** id поста, открытого в модалке редактирования; null — модалка закрыта */
  editingPostId: string | null;
}

const initialState: EditPostState = { editingPostId: null };

const editPostSlice = createSlice({
  name: 'editPost',
  initialState,
  reducers: {
    editStarted(state, action: PayloadAction<string>) {
      state.editingPostId = action.payload;
    },
    editCancelled(state) {
      state.editingPostId = null;
    },
  },
  // Модалка закрывается в ответ на доменные события, а не отдельным dispatch из компонента
  extraReducers: (builder) => {
    builder
      .addCase(postUpdated, (state) => {
        state.editingPostId = null;
      })
      .addCase(postRemoved, (state, action) => {
        if (state.editingPostId === action.payload) state.editingPostId = null;
      });
  },
  selectors: {
    selectEditingPostId: (state) => state.editingPostId,
  },
});

export const { editStarted, editCancelled } = editPostSlice.actions;
export const { selectEditingPostId } = editPostSlice.selectors;
export const editPostReducer = editPostSlice.reducer;
