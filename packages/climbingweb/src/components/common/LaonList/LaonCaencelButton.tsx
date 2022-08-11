import { ButtonProps } from './type';

export const LaonCancelButton = ({ onClick }: ButtonProps) => {

    return (
        <button onClick={onClick} className=' w-10 h-6 bg-white border border-gray-300 rounded-lg text-xs'>취소</button>
    );
};