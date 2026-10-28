import { useAppDispatch } from '@/shared/lib/store/hooks';
import { Button } from '@/shared/ui';
import { editStarted } from '../model/editPostSlice';

export const EditPostButton = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  return (
    <Button wide aria-haspopup="dialog" onClick={() => dispatch(editStarted(postId))}>
      Изменить
    </Button>
  );
};
