import { selectPostIds } from '@/entities/post';
import { PostCard } from '@/widgets/post-card';
import { useAppSelector } from '@/shared/lib/store/hooks';
import s from './PostFeed.module.css';

export const PostFeed = () => {
  // Лента подписана только на массив id: правка текста поста её не перерисовывает
  const postIds = useAppSelector(selectPostIds);

  if (postIds.length === 0) {
    return <p className={s.empty}>Постов пока нет — напишите первый.</p>;
  }

  return (
    <ul className={s.feed} aria-label="Лента постов">
      {postIds.map((id) => (
        <li key={id}>
          <PostCard postId={id} />
        </li>
      ))}
    </ul>
  );
};
