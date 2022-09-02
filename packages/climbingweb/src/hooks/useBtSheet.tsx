import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { bindActionCreators } from 'redux';
import { RootState } from '../store/slices';
import { openBTSheet, closeBTSheet, setSheet } from '../store/slices/uiSlice';

const useBTSheetActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ openBTSheet, closeBTSheet, setSheet }, dispatch);
};

type UseBTSheetResult = {
  isOpen: boolean;
  openBTS: ActionCreatorWithoutPayload<string>;
  closeBTS: ActionCreatorWithoutPayload<string>;
  setBTS: ActionCreatorWithOptionalPayload<ReactNode | ReactNode[], string>;
  renderSheet: () => JSX.Element;
};

export const useBTSheet = (): UseBTSheetResult => {
  const { open: isOpen, sheet } = useSelector(
    (state: RootState) => state.ui.btSheet
  );
  const {
    openBTSheet: openBTS,
    closeBTSheet: closeBTS,
    setSheet: setBTS,
  } = useBTSheetActions();

  const renderSheet = () => {
    return <BottomSheet open={isOpen}>{sheet}</BottomSheet>;
  };

  return { isOpen, openBTS, closeBTS, setBTS, renderSheet };
};
