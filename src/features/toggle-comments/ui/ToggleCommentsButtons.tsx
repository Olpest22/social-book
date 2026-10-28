import { useAppDispatch } from '@/shared/lib/store/hooks';
import { Button } from '@/shared/ui';
import { commentsHidden, commentsShown } from '../model/commentsVisibilitySlice';

interface ToggleProps {
  postId: string;
  /** id блока комментариев — для aria-controls */
  controls: string;
}

export const ShowCommentsButton = ({ postId, controls }: ToggleProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      aria-expanded={false}
      aria-controls={controls}
      onClick={() => dispatch(commentsShown(postId))}
    >
      Комментарии
    </Button>
  );
};

export const HideCommentsButton = ({ postId, controls }: ToggleProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      aria-expanded
      aria-controls={controls}
      onClick={() => dispatch(commentsHidden(postId))}
    >
      Спрятать
    </Button>
  );
};
