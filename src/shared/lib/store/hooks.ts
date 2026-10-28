import { useDispatch, useSelector } from 'react-redux';

// Типизированные хуки: используем их вместо голых useDispatch/useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
