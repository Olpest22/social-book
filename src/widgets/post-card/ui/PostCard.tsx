import { memo, useId } from 'react';
import { CommentBubble, selectCommentById, selectCommentIdsByPostId } from '@/entities/comment';
import { PostText, selectPostById } from '@/entities/post';
import { AddCommentForm } from '@/features/add-comment';
import { DeleteCommentButton } from '@/features/delete-comment';
import { DeletePostButton } from '@/features/delete-post';
import { EditPostButton } from '@/features/edit-post';
import {
  HideCommentsButton,
  ShowCommentsButton,
  selectAreCommentsShown,
} from '@/features/toggle-comments';
import { useAppSelector } from '@/shared/lib/store/hooks';
import { Card } from '@/shared/ui';
import s from './PostCard.module.css';

/**
 * Виджет собирает пост из сущностей и фич. Получает только id и сам выбирает данные из стора:
 * изменение одного поста перерисовывает только его карточку, а не всю ленту.
 */
export const PostCard = memo(({ postId }: { postId: string }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const commentIds = useAppSelector((state) => selectCommentIdsByPostId(state, postId));
  const commentsShown = useAppSelector((state) => selectAreCommentsShown(state, postId));
  const commentsBlockId = useId();

  if (!post) return null;

  return (
    <Card as="article" className={s.card}>
      <PostText text={post.text} />
      <hr className={s.divider} />

      {commentsShown ? (
        <section id={commentsBlockId} className={s.comments} aria-label="Комментарии">
          <AddCommentForm postId={postId} />
          {commentIds.length > 0 && (
            <ul className={s.commentList}>
              {commentIds.map((id) => (
                <CommentRow key={id} commentId={id} />
              ))}
            </ul>
          )}
          <div>
            <HideCommentsButton postId={postId} controls={commentsBlockId} />
          </div>
        </section>
      ) : (
        <footer className={s.footer}>
          <div className={s.footerInfo}>
            <ShowCommentsButton postId={postId} controls={commentsBlockId} />
            <span className={s.count}>Количество комментарий - {commentIds.length}</span>
          </div>
          <div className={s.footerActions}>
            <EditPostButton postId={postId} />
            <DeletePostButton postId={postId} />
          </div>
        </footer>
      )}
    </Card>
  );
});
PostCard.displayName = 'PostCard';

const CommentRow = memo(({ commentId }: { commentId: string }) => {
  const comment = useAppSelector((state) => selectCommentById(state, commentId));
  if (!comment) return null;
  return (
    <li className={s.commentRow}>
      <CommentBubble text={comment.text} />
      <DeleteCommentButton commentId={commentId} />
    </li>
  );
});
CommentRow.displayName = 'CommentRow';
