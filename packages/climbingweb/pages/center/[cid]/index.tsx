import { CenterInfoContent } from 'climbingweb/src/components/CenterInfo/CenterInfoContent';
import { CenterInfoHead } from 'climbingweb/src/components/CenterInfo/CenterInfoHead';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  OptionButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import { useFindCenter } from 'climbingweb/src/hooks/queries/center/queryKey';
import { SlideRight } from 'climbingweb/src/components/Transition/SlideRight';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function CenterDetailPage() {
  const router = useRouter();
  const { cid } = router.query;
  //cid string 거르는 로직, useRouter 에 대해 자세히 보고 추후 반드시 변경 해야함
  const centerId = cid as string;

  //바텀 시트 사용을 위한 state
  const [openBTSheet, setOpenBTSheet] = useState<boolean>(false);

  //암장 상세 정보 useQuery state
  const {
    data: CenterDetailData,
    isError: isCenterDetailError,
    error: CenterDetailerror,
  } = useFindCenter(centerId);

  //암장 옵션 아이콘 클릭 핸들러
  const handleOptionIconClick = () => setOpenBTSheet(true);

  if (isCenterDetailError) return <ErrorContent error={CenterDetailerror} />;

  if (CenterDetailData)
    return (
      <section className="mb-footer overflow-auto scrollbar-hide">
        <SlideRight>
          <AppBar
            leftNode={<AppLogo />}
            rightNode={
              <div className="flex flex-row gap-x-3">
                {/* <BookMarkButton
                onClick={handleLikeIconClick}
                isBookMarked={CenterDetailData.isBookmarked}
              /> */}
                <OptionButton onClick={handleOptionIconClick} />
              </div>
            }
            className="h-[7.82vh] pl-[20px] pr-[21px] pb-[10px] pt-[15px]"
          />
          <CenterInfoHead
            name={CenterDetailData.name}
            address={CenterDetailData.address}
            tel={CenterDetailData.tel}
            instagramUrl={CenterDetailData.instagramUrl}
            webUrl={CenterDetailData.webUrl}
            youtubeUrl={CenterDetailData.youtubeUrl}
            isBookMarked={CenterDetailData.isBookmarked}
            centerId={centerId}
          />
          <CenterInfoContent data={CenterDetailData} />
        </SlideRight>
        <BottomSheet open={openBTSheet} onDismiss={() => setOpenBTSheet(false)}>
          <ListSheet
            headerTitle={''}
            list={['수정 요청']}
            onSelect={() => router.push(`/center/request/${centerId}`)}
            className="text-sm font-normal"
          />
        </BottomSheet>
      </section>
    );

  return <Loading />;
}
