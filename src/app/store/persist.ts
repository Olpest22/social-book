import { createListenerMiddleware, type UnknownAction } from '@reduxjs/toolkit';
import type { CommentsState } from '@/entities/comment';
import type { PostsState } from '@/entities/post';

const STORAGE_KEY = 'social-book/state/v1';

type PersistedState = { posts: PostsState; comments: CommentsState };

// Сохраняем только доменные данные. UI-состояние (открытая модалка, раскрытые комментарии)
// после перезагрузки начинается с чистого листа
const isDomainAction = (action: UnknownAction) =>
  action.type.startsWith('posts/') || action.type.startsWith('comments/');

// Побочный эффект (запись в localStorage) живёт в listener middleware, а не в редьюсерах:
// редьюсеры остаются чистыми функциями
export const persistListener = createListenerMiddleware();

persistListener.startListening({
  predicate: isDomainAction,
  effect: (_action, api) => {
    const { posts, comments } = api.getState() as PersistedState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ posts, comments }));
    } catch {
      // Приватный режим или переполнение хранилища: приложение работает без сохранения
    }
  },
});

const isPersistedState = (value: unknown): value is PersistedState => {
  const v = value as PersistedState | null;
  return Boolean(v?.posts?.ids && v.posts.entities && v.comments?.ids && v.comments.entities);
};

export const loadPersistedState = (): PersistedState | null => {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (isPersistedState(parsed)) return parsed;
  } catch {
    // Повреждённые данные — считаем, что сохранения нет
  }
  return null;
};
