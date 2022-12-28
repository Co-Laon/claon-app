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

  const [rating, setRating] = useState(5);

  const { mutate: createReviewMutate } = useCreateReview(centerId);

  const handleSubmitClick = () => {
    createReviewMutate({
      content: textAreaRef.current?.value + '',
      rank: rating,
    });
    toast('리뷰가 작성되었습니다.');
    window.history.back();
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
      <div className="px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-xl font-extrabold leading-6">
            리뷰를 작성해주세요
          </h2>
          <StarRating
            size="md"
            count={count}
            initialValue={5}
            setData={setRating}
          />
          <TextArea
            refObj={textAreaRef}
            placeholder="요청 내용을 자세히 입력해주세요."
          />
        </div>
        <NormalButton onClick={handleSubmitClick}>완료</NormalButton>
      </div>
    </section>
  );
}
