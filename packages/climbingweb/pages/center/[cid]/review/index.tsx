import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { StarRating } from 'climbingweb/src/components/common/StarRating';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import { useRouter } from 'next/router';
import { useCreateReview } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useRef, useState } from 'react';
import { useToast } from 'climbingweb/src/hooks/useToast';

export default function ReportPage() {
  const router = useRouter();
  const { cid } = router.query;
  const centerId = cid as string;

  const count = 5;

  const { toast } = useToast();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [rating, setRating] = useState<number>(5);

  const { mutate: createReviewMutate, isLoading } = useCreateReview(centerId, {
    onSuccess: () => {
      window.history.back();
      toast('리뷰가 작성되었습니다.');
    },
    onError(error) {
      toast(error.message);
    },
  });

  const handleSubmitClick = () => {
    createReviewMutate({
      content: textAreaRef.current?.value + '',
      rank: Math.floor(rating),
    });
  };

  const handleBackButtonClick = () => {
    window.history.back();
  };

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
          initialValue={5}
          setData={setRating}
        />
        <TextArea
          className="h-[232px] text-sm my-5"
          refObj={textAreaRef}
          placeholder="500자 이내 리뷰 작성"
          limitLength={500}
        />
        <NormalButton onClick={handleSubmitClick} disabled={isLoading}>
          완료
        </NormalButton>
      </div>
    </section>
  );
}
