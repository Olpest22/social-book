import { useRef, useState, type FormEvent } from 'react';

/**
 * Локальный черновик текстового поля.
 * Набираемый текст — это состояние формы, а не приложения, поэтому он живёт в useState,
 * а в Redux попадает только готовое значение через экшен (так рекомендует Redux Style Guide).
 */
export function useTextDraft<E extends HTMLInputElement | HTMLTextAreaElement>(
  onSubmit: (text: string) => void,
  initial = '',
) {
  const [value, setValue] = useState(initial);
  const [invalid, setInvalid] = useState(false);
  const ref = useRef<E>(null);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = value.trim();
    if (!text) {
      // Пустой текст не отправляем: подсвечиваем поле и возвращаем в него фокус
      setInvalid(true);
      ref.current?.focus();
      return;
    }
    onSubmit(text);
    setValue('');
    setInvalid(false);
  };

  return {
    submit,
    fieldProps: {
      ref,
      value,
      'aria-invalid': invalid || undefined,
      onChange: (event: { target: { value: string } }) => {
        setValue(event.target.value);
        if (invalid) setInvalid(false);
      },
    },
  };
}
