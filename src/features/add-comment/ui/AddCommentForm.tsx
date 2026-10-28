import { commentAdded } from '@/entities/comment';
import { useAppDispatch } from '@/shared/lib/store/hooks';
import { useTextDraft } from '@/shared/lib/useTextDraft';
import { Button, TextField } from '@/shared/ui';
import s from './AddCommentForm.module.css';

export const AddCommentForm = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const { submit, fieldProps } = useTextDraft<HTMLInputElement>((text) =>
    dispatch(commentAdded({ postId, text })),
  );

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <TextField
        {...fieldProps}
        placeholder="Новый комментарий ..."
        aria-label="Текст нового комментария"
        maxLength={500}
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
