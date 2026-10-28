import s from './PostText.module.css';

// Чисто презентационный компонент: данные приходят пропсами, о сторе он не знает
export const PostText = ({ text }: { text: string }) => <p className={s.text}>{text}</p>;
