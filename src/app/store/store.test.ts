import { describe, expect, it, vi } from 'vitest';
import {
  commentAdded,
  commentRemoved,
  selectCommentIdsByPostId,
  selectCommentsCountByPostId,
} from '@/entities/comment';
import { postAdded, postRemoved, postUpdated, selectPostById, selectPostIds } from '@/entities/post';
import { editCancelled, editStarted, selectEditingPostId } from '@/features/edit-post';
import { commentsHidden, commentsShown, selectAreCommentsShown } from '@/features/toggle-comments';
import { setupStore } from './store';

// Интеграционные тесты: настоящий стор со всеми редьюсерами, проверяем через публичные селекторы
const createStoreWithPost = (text = 'Пост') => {
  const store = setupStore();
  store.dispatch(postAdded(text));
  const [postId] = selectPostIds(store.getState());
  return { store, postId };
};

describe('posts', () => {
  it('добавляет пост с обрезанными пробелами', () => {
    const { store, postId } = createStoreWithPost('  Привет  ');
    expect(selectPostById(store.getState(), postId)?.text).toBe('Привет');
  });

  it('новые посты идут первыми', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
    const { store, postId: older } = createStoreWithPost('первый');
    vi.setSystemTime(new Date('2026-01-01T11:00:00Z'));
    store.dispatch(postAdded('второй'));
    vi.useRealTimers();
    expect(selectPostIds(store.getState())[1]).toBe(older);
  });

  it('редактирует текст поста', () => {
    const { store, postId } = createStoreWithPost();
    store.dispatch(postUpdated({ id: postId, text: 'Новый текст' }));
    expect(selectPostById(store.getState(), postId)?.text).toBe('Новый текст');
  });
});

describe('comments', () => {
  it('добавляет и удаляет комментарий поста', () => {
    const { store, postId } = createStoreWithPost();
    store.dispatch(commentAdded({ postId, text: 'Комментарий' }));
    const [commentId] = selectCommentIdsByPostId(store.getState(), postId);
    expect(selectCommentsCountByPostId(store.getState(), postId)).toBe(1);

    store.dispatch(commentRemoved(commentId));
    expect(selectCommentsCountByPostId(store.getState(), postId)).toBe(0);
  });

  it('возвращает стабильную ссылку, пока комментарии не меняются', () => {
    const { store, postId } = createStoreWithPost();
    const a = selectCommentIdsByPostId(store.getState(), postId);
    store.dispatch(commentsShown(postId));
    expect(selectCommentIdsByPostId(store.getState(), postId)).toBe(a);
  });
});

describe('каскад postRemoved', () => {
  it('удаляет комментарии поста и сбрасывает связанное UI-состояние', () => {
    const { store, postId } = createStoreWithPost();
    store.dispatch(postAdded('другой'));
    const otherId = selectPostIds(store.getState()).find((id) => id !== postId)!;
    store.dispatch(commentAdded({ postId, text: 'удалится' }));
    store.dispatch(commentAdded({ postId: otherId, text: 'останется' }));
    store.dispatch(commentsShown(postId));
    store.dispatch(editStarted(postId));

    store.dispatch(postRemoved(postId));

    const state = store.getState();
    expect(selectPostById(state, postId)).toBeUndefined();
    expect(selectCommentsCountByPostId(state, postId)).toBe(0);
    expect(selectCommentsCountByPostId(state, otherId)).toBe(1);
    expect(selectAreCommentsShown(state, postId)).toBe(false);
    expect(selectEditingPostId(state)).toBeNull();
  });
});

describe('UI-состояние', () => {
  it('раскрывает и прячет комментарии', () => {
    const { store, postId } = createStoreWithPost();
    store.dispatch(commentsShown(postId));
    expect(selectAreCommentsShown(store.getState(), postId)).toBe(true);
    store.dispatch(commentsHidden(postId));
    expect(selectAreCommentsShown(store.getState(), postId)).toBe(false);
  });

  it('модалка закрывается после сохранения и по отмене', () => {
    const { store, postId } = createStoreWithPost();
    store.dispatch(editStarted(postId));
    expect(selectEditingPostId(store.getState())).toBe(postId);
    store.dispatch(postUpdated({ id: postId, text: 'x' }));
    expect(selectEditingPostId(store.getState())).toBeNull();

    store.dispatch(editStarted(postId));
    store.dispatch(editCancelled());
    expect(selectEditingPostId(store.getState())).toBeNull();
  });
});
