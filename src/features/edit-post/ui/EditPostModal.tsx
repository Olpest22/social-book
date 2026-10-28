import { useCallback } from 'react';
import { postUpdated, selectPostById } from '@/entities/post';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store/hooks';
import { useTextDraft } from '@/shared/lib/useTextDraft';
import { Button, Modal, TextArea } from '@/shared/ui';
import { editCancelled, selectEditingPostId } from '../model/editPostSlice';
import s from './EditPostModal.module.css';

/** Монтируется один раз на странице и сам решает, показываться ли, по состоянию из стора */
export const EditPostModal = () => {
  const postId = useAppSelector(selectEditingPostId);
  const post = useAppSelector((state) => (postId ? selectPostById(state, postId) : undefined));
  const dispatch = useAppDispatch();
  const close = useCallback(() => dispatch(editCancelled()), [dispatch]);

  if (!post) return null;
  // key сбрасывает черновик при открытии другого поста
  return <EditPostDialog key={post.id} postId={post.id} initialText={post.text} onClose={close} />;
};

interface EditPostDialogProps {
  postId: string;
  initialText: string;
  onClose: () => void;
}

const EditPostDialog = ({ postId, initialText, onClose }: EditPostDialogProps) => {
  const dispatch = useAppDispatch();
  // Модалка закрывается редьюсером editPost в ответ на postUpdated — отдельный dispatch не нужен
  const { submit, fieldProps } = useTextDraft<HTMLTextAreaElement>(
    (text) => dispatch(postUpdated({ id: postId, text })),
    initialText,
  );

  return (
    <Modal label="Редактирование поста" onClose={onClose}>
      <form className={s.form} onSubmit={submit} noValidate>
        <TextArea
          {...fieldProps}
          aria-label="Текст поста"
          rows={3}
          autoFocus
          // Курсор в конец текста, чтобы сразу продолжить редактирование
          onFocus={(event) => {
            const { length } = event.currentTarget.value;
            event.currentTarget.setSelectionRange(length, length);
          }}
          maxLength={1000}
          onKeyDown={(event) => {
            // Ctrl/Cmd + Enter — подтвердить без мыши
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) submit();
          }}
        />
        <div className={s.actions}>
          <Button type="submit" className={s.confirm}>
            Подтвердить
          </Button>
          <Button variant="danger" wide onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
