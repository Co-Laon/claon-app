
interface ButtonProps {
    onClick?: ({ }: any) => void;
    children?: React.ReactNode | React.ReactNode[];
}


export const NormalButton = ({ onClick, children }: ButtonProps) => {
    return <button className='w-full bg-purple-500 rounded-lg w-30 h-12 text-white' onClick={onClick}>{children}</button>;
};

export const SmmallNodeButton = ({ onClick, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className=' w-10 h-6 bg-white border border-gray-300 rounded-lg text-xs'>{children}</button>
    );
};