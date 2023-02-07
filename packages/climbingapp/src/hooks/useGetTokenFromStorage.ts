import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/slices';
import { getTokenFromStorage } from '../store/slices/auth';

export const useGetTokenFromStorage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getTokenFromStorage());
  }, []);

  return { loading };
};
