import { createSelector } from '@reduxjs/toolkit';
import { commentsAdapter, type CommentsState } from './commentsSlice';

type StateWithComments = { comments: CommentsState };

const EMPTY: readonly string[] = [];

export const { selectById: selectCommentById, selectAll: selectAllComments } =
  commentsAdapter.getSelectors<StateWithComments>((state) => state.comments);

// Группировка id комментариев по постам считается один раз на изменение коллекции,
// а не в каждой карточке. Ссылки на массивы стабильны — карточки не перерисовываются зря.
const selectCommentIdsGroupedByPost = createSelector(
  [selectAllComments],
  (comments) => {
    const grouped: Record<string, string[]> = {};
    for (const comment of comments) {
      (grouped[comment.postId] ??= []).push(comment.id);
    }
    return grouped;
  },
);

export const selectCommentIdsByPostId = (
  state: StateWithComments,
  postId: string,
): readonly string[] => selectCommentIdsGroupedByPost(state)[postId] ?? EMPTY;

export const selectCommentsCountByPostId = (
  state: StateWithComments,
  postId: string,
): number => selectCommentIdsByPostId(state, postId).length;
