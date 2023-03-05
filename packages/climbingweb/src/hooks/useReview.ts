import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../store/slices';
import { initReview, setReview } from '../store/slices/centerReview';

export const useReviewActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ setReview, initReview }, dispatch);
};

export function useGetReview() {
  return useSelector((state: RootState) => state.centerReview);
}
