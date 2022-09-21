import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { ListSheet } from 'climbingweb/src/components/common/BottomSheetContents/ListSheet/ListSheet';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import { DropDown } from 'climbingweb/src/components/common/DropDown';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
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
  const header = '신고 사유';
  const reportList = ['부적절한 게시글', '부적절한 닉네임', '잘못된 암장 선택'];

  return (
    <section className="mb-footer">
      <AppBar leftNode={<BackButton />} title="" rightNode={<Empty />} />
      <div className="px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-extrabold leading-6">신고 사유</h2>
          <DropDown
            onSheetOpen={handleOpen}
            placeholder="신고 사유를 선택해주세요"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="text-lg font-extrabold leading-6">신고 내용</h2>
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
