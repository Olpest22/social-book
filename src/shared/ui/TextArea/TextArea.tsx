import type { Ref, TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import s from './TextArea.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

// React 19: ref передаётся обычным пропом, forwardRef не нужен
export const TextArea = ({ className, ...rest }: TextAreaProps) => (
  <textarea className={cn(s.textarea, className)} {...rest} />
);
