import { commentRemoved } from '@/entities/comment';
import { useAppDispatch } from '@/shared/lib/store/hooks';
import { Button } from '@/shared/ui';

export const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="danger"
      aria-label="Удалить комментарий"
      onClick={() => dispatch(commentRemoved(commentId))}
    >
      Удалить
    </Button>
  );
};
