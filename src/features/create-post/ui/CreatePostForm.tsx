import { postAdded } from '@/entities/post';
import { useAppDispatch } from '@/shared/lib/store/hooks';
import { useTextDraft } from '@/shared/lib/useTextDraft';
import { Button, Card, TextField } from '@/shared/ui';
import s from './CreatePostForm.module.css';

export const CreatePostForm = () => {
  const dispatch = useAppDispatch();
  const { submit, fieldProps } = useTextDraft<HTMLInputElement>((text) =>
    dispatch(postAdded(text)),
  );

  return (
    <Card as="form" className={s.form} onSubmit={submit} noValidate>
      <TextField
        {...fieldProps}
        size="lg"
        tone="surface"
        placeholder="Новый пост ..."
        aria-label="Текст нового поста"
        maxLength={1000}
      />
      <Button type="submit" size="lg">
        Добавить
      </Button>
    </Card>
  );
};
