export type { Comment } from './model/types';
export {
  commentsReducer,
  commentAdded,
  commentRemoved,
  type CommentsState,
} from './model/commentsSlice';
export {
  selectCommentById,
  selectCommentIdsByPostId,
  selectCommentsCountByPostId,
} from './model/selectors';
export { CommentBubble } from './ui/CommentBubble';
