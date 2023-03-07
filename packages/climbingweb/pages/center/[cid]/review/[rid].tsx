import { AppBar } from 'climbingweb/src/components/common/AppBar';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import { StarRating } from 'climbingweb/src/components/common/StarRating';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { useUpdateReview } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useGetReview } from 'climbingweb/src/hooks/useReview';
import { useToast } from 'climbingweb/src/hooks/useToast';
import router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ReportEditPage() {
  const { cid, rid } = router.query;
  const { content, rank } = useGetReview();
  const [rating, setRating] = useState<number>(rank);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const count = 5;
  const centerId = cid as string;
  const reviewId = rid as string;
  const { toast } = useToast();

  useEffect(() => {}, []);

  const { mutate: updateReviewMutate, isLoading } = useUpdateReview(
    centerId,
    reviewId,
    {
      onSuccess: () => {
        window.history.back();
        toast('리뷰가 수정되었습니다.');
      },
      onError(error: any) {
        toast(error.message);
      },
    }
  );

  const handleSubmitClick = () => {
    updateReviewMutate({
      content: textAreaRef.current?.value + '',
      rank: Math.floor(rating),
    });
  };

  const handleBackButtonClick = useCallback(() => {
    router.push(`/center/${centerId}`);
  }, []);

  return (
    <section className="mb-footer">
      <AppBar
        leftNode={<BackButton onClick={handleBackButtonClick} />}
        title=""
        rightNode={<Empty />}
      />
      <div className="px-5">
        <h2 className="text-xl font-extrabold leading-6 my-4">
          리뷰를 작성해주세요
        </h2>
        <StarRating
          size="md"
          count={count}
          initialValue={rank}
          setData={setRating}
        />
        <TextArea
          className="h-[232px] text-sm my-5"
          refObj={textAreaRef}
          placeholder="500자 이내 리뷰 작성"
          limitLength={500}
          data={content}
        />
        <NormalButton onClick={handleSubmitClick} disabled={isLoading}>
          완료
        </NormalButton>
      </div>
    </section>
  );
}
