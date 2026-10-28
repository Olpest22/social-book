// Публичный API сущности post: снаружи импортируем только отсюда
export type { Post } from './model/types';
export {
  postsReducer,
  postAdded,
  postUpdated,
  postRemoved,
  type PostsState,
} from './model/postsSlice';
export { selectPostIds, selectPostById, selectPostsTotal } from './model/selectors';
export { PostText } from './ui/PostText';
