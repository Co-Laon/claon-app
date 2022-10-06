import { Dispatch, SetStateAction, useCallback } from 'react';

export const NextButton = ({
  pageState,
  setPageState,
  onSubmit,
}: {
  pageState: string;
  setPageState: Dispatch<SetStateAction<string>>;
  onSubmit: any;
}) => {
  const handleNextButton = useCallback(() => {
    if (pageState === 'first') {
      setPageState('second');
    } else {
      onSubmit();
    }
  }, [pageState, setPageState, onSubmit]);

  return (
    <span className="text-sm text-purple-500" onClick={handleNextButton}>
      {pageState === 'first' ? '다음' : '완료'}
    </span>
  );
};
