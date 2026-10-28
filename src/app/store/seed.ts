import type { Comment, CommentsState } from '@/entities/comment';
import type { Post, PostsState } from '@/entities/post';
import type { CommentsVisibilityState } from '@/features/toggle-comments';

// Стартовые данные повторяют содержимое макета, чтобы лента не была пустой при первом запуске

const posts: Post[] = [
  {
    id: 'seed-post-1',
    text: 'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
    createdAt: '2024-05-14T09:00:00.000Z',
  },
  {
    id: 'seed-post-2',
    text: 'Вчера весь вечер разбирался с Redux Toolkit. Нормализованное хранилище оказалось проще, чем казалось на первый взгляд.',
    createdAt: '2024-05-13T18:30:00.000Z',
  },
];

const comments: Comment[] = [
  { id: 'seed-c-1', postId: 'seed-post-1', text: 'Первый комментарий о выше сказанном посте ...', createdAt: '2024-05-14T09:10:00.000Z' },
  { id: 'seed-c-2', postId: 'seed-post-1', text: 'Второй комментарий о выше сказанном посте ...', createdAt: '2024-05-14T09:20:00.000Z' },
  { id: 'seed-c-3', postId: 'seed-post-2', text: 'Первый комментарий о выше сказанном посте ...', createdAt: '2024-05-13T19:00:00.000Z' },
  { id: 'seed-c-4', postId: 'seed-post-2', text: 'Второй комментарий о выше сказанном посте ...', createdAt: '2024-05-13T19:30:00.000Z' },
];

const toEntityState = <T extends { id: string }>(items: T[]) => ({
  ids: items.map((item) => item.id),
  entities: Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, T>,
});

export const seedState: {
  posts: PostsState;
  comments: CommentsState;
  commentsVisibility: CommentsVisibilityState;
} = {
  posts: toEntityState(posts),
  comments: toEntityState(comments),
  commentsVisibility: { expanded: { 'seed-post-2': true } },
};
