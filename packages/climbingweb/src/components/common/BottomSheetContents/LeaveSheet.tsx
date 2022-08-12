


interface ButtonProps {
    onClick: ({ }: any) => void;
}

export const LeaveSheet = ({ onClick }: ButtonProps) => {

    return (
        <div className='flex flex-col gap-6 mb-4'>
            <p className='text-sm text-gray-600 font-normal'>CLAON에서 하강 하시겠습니까?</p>
            <div className='flex flex-row justify-center text-center text-base font-bold'>
                <p className='w-6/12'>아니오</p>
                <p className='text-gray-300'> | </p>
                <p className='w-6/12' onClick={onClick}> 예</p>
            </div>
        </div>
    );
};