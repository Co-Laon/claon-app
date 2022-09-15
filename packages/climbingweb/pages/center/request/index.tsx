import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import { DropDown } from 'climbingweb/src/components/common/DropDown';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/IconButton';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
export default function ReportPage({}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
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

  return (
    <section className="mb-footer">
      <AppBar leftNode={<BackButton />} title="" rightNode={<Empty />} />
      <div className="px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-extrabold leading-6">요청 부분</h2>
          <DropDown onSheetOpen={handleOpen} />
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-extrabold leading-6">요청 내용</h2>
          <TextArea
            setData={() => {}}
            placeholder="요청 내용을 자세히 입력해주세요."
          />
        </div>
        <NormalButton>완료</NormalButton>
      </div>
      <BottomSheet open={open} onDismiss={handleDismiss}>
        <ListSheet headerTitle={header} list={reportList} />
      </BottomSheet>
    </section>
  );
}
