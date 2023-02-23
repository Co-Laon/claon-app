import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import { DropDown } from 'climbingweb/src/components/common/DropDown';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRouter } from 'next/router';
import { useCreateCenterReport } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useToast } from 'climbingweb/src/hooks/useToast';

export default function ReportPage({}) {
  const router = useRouter();
  const { cid } = router.query;
  const centerId = cid as string;
  const { toast } = useToast();

  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  // 수정요청 request state
  const [reportType, serReportType] = useState<
    | '사진'
    | '세팅일정'
    | '연락처'
    | '운영시간'
    | '이용요금'
    | '편의시설'
    | '홀드정보'
  >('사진');

  // 수정 요청 useMutation
  const {
    mutate: createCenterReportMutate,
    isSuccess,
    isError,
  } = useCreateCenterReport(centerId);

  // 바텀 시트 on/off state
  const [open, setOpen] = useState<boolean>(false);

  // 바텀 시트 open 핸들러
  const handleOpen = () => {
    setOpen(true);
  };
  // 바텀 시트 close 핸들러
  const handleDismiss = () => {
    setOpen(false);
  };

  const header = '요청 부분';
  const reportList = [
    '연락처',
    '사진',
    '운영시간',
    '편의시설',
    '이용요금',
    '홀드 정보',
    '세팅 일정',
  ];

  // back 버튼 클릭 핸들러
  const handleBackButtonClick = () => {
    router.back();
  };

  // 수정 요청 request의 reportType input 변경 핸들러
  const handleReportTypeInputChange = (
    selectedData:
      | '사진'
      | '세팅일정'
      | '연락처'
      | '운영시간'
      | '이용요금'
      | '편의시설'
      | '홀드정보'
  ) => {
    serReportType(selectedData);
    setOpen(false);
  };

  // 수정 요청 완료 버튼 클릭 핸들러
  const handleSubmitButtonClick = () => {
    if (contentInputRef.current) {
      createCenterReportMutate({
        content: contentInputRef.current?.value,
        reportType: reportType,
      });
      if (isSuccess) {
        router.back();
        toast('수정 요청이 완료되었습니다.');
      }
      if (isError) toast('수정 요청에 실패했습니다.');
    }
  };

  return (
    <section className="mb-footer">
      <AppBar
        leftNode={<BackButton onClick={handleBackButtonClick} />}
        title=""
        rightNode={<Empty />}
      />
      <div className="px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold ">요청 부분</h2>
          <DropDown
            onSheetOpen={handleOpen}
            placeholder="요청 부분을 선택해주세요"
            value={reportType}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold ">요청 내용</h2>
          <TextArea
            refObj={contentInputRef}
            placeholder="요청 내용을 자세히 입력해주세요."
            className="h-[32.4vh]"
          />
        </div>
        <NormalButton
          onClick={handleSubmitButtonClick}
          className="text-base font-bold"
        >
          완료
        </NormalButton>
      </div>
      <BottomSheet open={open} onDismiss={handleDismiss}>
        <ListSheet
          headerTitle={header}
          list={reportList}
          onSelect={handleReportTypeInputChange}
          className="text-sm font-normal text-left"
        />
      </BottomSheet>
    </section>
  );
}
