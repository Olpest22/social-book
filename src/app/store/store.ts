import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '@/entities/post';
import { commentsReducer } from '@/entities/comment';
import { editPostReducer } from '@/features/edit-post';
import { commentsVisibilityReducer } from '@/features/toggle-comments';
import { loadPersistedState, persistListener } from './persist';
import { seedState } from './seed';

// Доменные данные (posts, comments) и UI-состояние фич хранятся раздельно
export const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  editPost: editPostReducer,
  commentsVisibility: commentsVisibilityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Фабрика нужна для тестов: каждый тест получает чистый стор со своим начальным состоянием
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().prepend(persistListener.middleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// Первый визит — стартовые данные как в макете (второй пост с раскрытыми комментариями),
// повторный — сохранённые посты и комментарии
export const store = setupStore(loadPersistedState() ?? seedState);
