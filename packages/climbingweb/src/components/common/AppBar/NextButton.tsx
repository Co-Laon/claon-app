import { Dispatch, SetStateAction, useCallback } from 'react';


export const NextButton = ({ pageState, setPageState }: { pageState: string, setPageState: Dispatch<SetStateAction<string>> }) => {

    const handleNextButton = useCallback(() => {
        if (pageState === 'first') {
            setPageState('second');
        } else {
            console.log('완료');
        }
    }, [pageState, setPageState]);

    return <span className='text-sm text-purple-500' onClick={handleNextButton}>{pageState === 'first' ? '다음' : '완료'}</span>;
};