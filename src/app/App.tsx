import { Provider } from 'react-redux';
import { FeedPage } from '@/pages/feed';
import { store } from './store/store';

export const App = () => (
  <Provider store={store}>
    <FeedPage />
  </Provider>
);
