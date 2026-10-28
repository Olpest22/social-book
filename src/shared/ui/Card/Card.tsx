import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/shared/lib/cn';
import s from './Card.module.css';

type CardProps<T extends ElementType> = {
  /** Семантический тег: article для поста, form для формы и т.д. */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Card = <T extends ElementType = 'div'>({
  as,
  className,
  ...rest
}: CardProps<T>) => {
  const Tag: ElementType = as ?? 'div';
  return <Tag className={cn(s.card, className)} {...rest} />;
};
