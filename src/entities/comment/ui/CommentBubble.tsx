import s from './CommentBubble.module.css';

export const CommentBubble = ({ text }: { text: string }) => (
  <p className={s.bubble}>{text}</p>
);
