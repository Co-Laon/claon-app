import { authorize, logout } from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { bindActionCreators } from 'redux';

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

const useAuthActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ authorize, logout }, dispatch);
};

export const useAuth = () => {
  const user = useUser();
  const authAction = useAuthActions();
  return { user, authorize: authAction.authorize, logout: authAction.logout };
};
