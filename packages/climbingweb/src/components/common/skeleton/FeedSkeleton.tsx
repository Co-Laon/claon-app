

export const FeedSkeleton = () => {

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4 mx-4 w-full'>
                <div>
                    <div className=' rounded-full w-16 h-16 animate-pulse dark:bg-gray-700 bg-gray-300' />
                </div>
                <div className='flex flex-col gap-2 w-full justify-center'>
                    <div className=' w-10/12 h-5 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300' />
                    <div className=' w-10/12 h-5 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300' />
                </div>
            </div>
            <div role="status" className="flex justify-center items-center max-w h-80 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700" />
            <div className=' w-6/12 h-5 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300 mx-4' />
            <div className=' w-11/12 h-20 animate-pulse rounded-lg dark:bg-gray-700 bg-gray-300 mx-4' />
        </div>
    );
};