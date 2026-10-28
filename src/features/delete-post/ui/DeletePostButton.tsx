import { postRemoved } from '@/entities/post';
import { useAppDispatch } from '@/shared/lib/store/hooks';
import { Button } from '@/shared/ui';

// Один экшен postRemoved: комментарии поста и связанное UI-состояние чистят свои редьюсеры
export const DeletePostButton = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  return (
    <Button variant="danger" wide onClick={() => dispatch(postRemoved(postId))}>
      Удалить
    </Button>
  );
};
