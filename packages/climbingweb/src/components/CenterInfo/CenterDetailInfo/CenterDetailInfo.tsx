

export const CenterDetailInfo = ({ }) => {
    const CenterInfoTitleList = ['운영시간', '편의시설', '이용 요금', '홀드 정보', '섹터 정보'];

    return (
        <div className='flex flex-col px-7'>
            {CenterInfoTitleList.map(title => (
                <div key={title} className='flex flex-col gap-2'>
                    <h2 className='font-semibold text-sm'>{title}</h2>
                    <div className=' '></div>
                </div>
            ))}
        </div>
    );
};