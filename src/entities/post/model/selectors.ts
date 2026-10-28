import { postsAdapter, type PostsState } from './postsSlice';

// Селекторы описаны через минимально нужную форму состояния,
// а не через RootState — сущность не зависит от слоя app
type StateWithPosts = { posts: PostsState };

export const {
  selectIds: selectPostIds,
  selectById: selectPostById,
  selectTotal: selectPostsTotal,
} = postsAdapter.getSelectors<StateWithPosts>((state) => state.posts);
