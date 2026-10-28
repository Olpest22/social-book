import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '@/shared/lib/cn';
import s from './TextField.module.css';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ref?: Ref<HTMLInputElement>;
  /** md — 40px (комментарий), lg — 50px (новый пост) */
  size?: 'md' | 'lg';
  /** В макете поле нового поста — цвета карточки, поле комментария — белое */
  tone?: 'surface' | 'plain';
}

export const TextField = ({
  size = 'md',
  tone = 'plain',
  className,
  ...rest
}: TextFieldProps) => (
  <input type="text" className={cn(s.field, s[size], s[tone], className)} {...rest} />
);
