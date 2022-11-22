import { CenterInfoContent } from 'climbingweb/src/components/CenterInfo/CenterInfoContent';
import { CenterInfoHead } from 'climbingweb/src/components/CenterInfo/CenterInfoHead';
import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  AppLogo,
  BookMarkButton,
  OptionButton,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import ErrorContent from 'climbingweb/src/components/common/Error/ErrorContent';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import { useFindCenter } from 'climbingweb/src/hooks/queries/center/useFindCenter';
import { useRouter } from 'next/router';

export default function CenterDetailPage() {
  const router = useRouter();
  const { cid } = router.query;
  //cid string 거르는 로직, useRouter 에 대해 자세히 보고 추후 반드시 변경 해야함
  const centerId = cid as string;

  //암장 상세 정보 useQuery state
  const {
    data: CenterDetailData,
    isError: isCenterDetailError,
    error: CenterDetailerror,
  } = useFindCenter(centerId);

  if (isCenterDetailError) return <ErrorContent error={CenterDetailerror} />;

  if (CenterDetailData)
    return (
      <section className="mb-footer overflow-auto scrollbar-hide">
        <AppBar
          leftNode={<AppLogo />}
          rightNode={
            <div className="flex flex-row gap-x-3">
              <BookMarkButton /> <OptionButton />
            </div>
          }
        />
        <CenterInfoHead
          name={CenterDetailData.name}
          address={CenterDetailData.address}
          tel={CenterDetailData.tel}
          instagramUrl={CenterDetailData.instagramUrl}
          webUrl={CenterDetailData.webUrl}
          youtubeUrl={CenterDetailData.youtubeUrl}
        />
        <CenterInfoContent data={CenterDetailData} />
      </section>
    );

  return <Loading />;
}
