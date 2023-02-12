import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../store/slices';
import { showBottomNavBar, hideBottomNavBar } from '../store/slices/manageBnb';

const useBnbActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ showBottomNavBar, hideBottomNavBar }, dispatch);
};

export function useBnbHide() {
  const { showBottomNavBar: showBnb, hideBottomNavBar: hideBnb } =
    useBnbActions();

  useEffect(() => {
    hideBnb();
    return () => {
      showBnb();
    };
  });
}

export function useBnbValue() {
  return useSelector((state: RootState) => state.manageBnb);

}
