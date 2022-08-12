

interface CountProps {
    maxCount: number;
    count: number;
}

export const StringCount = ({ maxCount, count }: CountProps) => {

    return (
        <p className='text-gray-300'>{count + '/' + maxCount}</p>
    );
};