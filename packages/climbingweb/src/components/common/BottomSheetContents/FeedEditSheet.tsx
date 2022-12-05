import { useEffect, useState } from 'react';
import { ButtonSheet } from './ButtonSheet';
import { ListSheet } from './ListSheet/ListSheet';
import { ConfirmSheetProps } from './type';

export const FeedEditSheet = ({ onCancel, onConfirm }: ConfirmSheetProps) => {
  const [selectDelete, setSelectDelete] = useState<boolean>(false);
  const handleToastDelete = (e: any) => {
    const target = e.target.innerHTML;
    if (target === '삭제하기') setSelectDelete(true);
  };
  console.log(selectDelete);
  useEffect(() => {
    setSelectDelete(false);
  }, []);

  const sheetList = ['삭제하기', '수정하기'];
  return (
    <>
      {selectDelete ? (
        <ButtonSheet
          onCancel={onCancel}
          onConfirm={onConfirm}
          text="게시글을 삭제하시겠습니까?"
        />
      ) : (
        <ListSheet
          headerTitle=""
          onSelect={handleToastDelete}
          list={sheetList}
        />
      )}
    </>
  );
};
