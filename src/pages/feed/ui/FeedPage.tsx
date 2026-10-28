import { CreatePostForm } from '@/features/create-post';
import { EditPostModal } from '@/features/edit-post';
import { PostFeed } from '@/widgets/post-feed';
import s from './FeedPage.module.css';

export const FeedPage = () => (
  <main className={s.page}>
    <h1 className="visually-hidden">Social Book</h1>
    <CreatePostForm />
    <PostFeed />
    <EditPostModal />
  </main>
);
