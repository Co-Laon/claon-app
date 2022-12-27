

export const CommentSkeleton = () => {

    return (
        <div className='flex flex-col gap-4 my-8'>
            <div className='flex flex-row gap-4 mx-4 w-full'>
                <div>
                    <div className=' rounded-full w-10 h-10 animate-pulse dark:bg-gray-700 bg-gray-300' />
                </div>
                <div className='flex flex-col gap-2 w-full justify-center'>
                    <div className=' w-10/12 h-5 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300' />
                    <div className=' w-10/12 h-5 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300' />
                </div>
            </div>
        </div>
    );
};