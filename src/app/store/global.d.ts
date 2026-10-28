import type { AppDispatch as AppDispatchType, RootState as RootStateType } from './store';

// Глобальные типы стора. Нижние слои (shared, features, widgets) используют их,
// не импортируя ничего из app — так FSD-зависимости идут только сверху вниз
declare global {
  type RootState = RootStateType;
  type AppDispatch = AppDispatchType;
}
