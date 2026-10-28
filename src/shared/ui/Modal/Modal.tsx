import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

interface ModalProps {
  /** Заголовок для скринридеров: в макете у модалки нет видимого заголовка */
  label: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ label, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  // Запоминаем элемент с фокусом до монтирования: autoFocus внутри модалки сработает раньше эффектов
  const [returnFocusTo] = useState(() => document.activeElement as HTMLElement | null);
  // Актуальный onClose без перезапуска эффекта: иначе новая ссылка на колбэк
  // на каждом рендере сбрасывала бы блокировку прокрутки и фокус
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Закрытие по Esc, блокировка прокрутки фона и возврат фокуса туда, откуда модалку открыли
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
      if (event.key === 'Tab') trapFocus(event, dialogRef.current);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      returnFocusTo?.focus();
    };
  }, [returnFocusTo]);

  return createPortal(
    <div
      className={s.overlay}
      onMouseDown={(event) => {
        // Закрываем только по клику на сам оверлей, не по клику внутри окна
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
      >
        <h2 id={labelId} className="visually-hidden">
          {label}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
};

const FOCUSABLE = 'button:not([disabled]), textarea, input, [href], [tabindex]:not([tabindex="-1"])';

// Фокус не уходит из модалки по Tab / Shift+Tab
function trapFocus(event: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return;
  const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE);
  if (nodes.length === 0) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
