import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import s from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  /** md — 40px (кнопки в карточках), lg — 50px (форма нового поста) */
  size?: 'md' | 'lg';
  /** Фиксированная ширина 120px, как у «Изменить»/«Удалить»/«Закрыть» в макете */
  wide?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  wide = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={cn(s.button, s[variant], s[size], wide && s.wide, className)}
    {...rest}
  />
);
