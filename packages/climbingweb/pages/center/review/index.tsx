import { AppBar } from 'climbingweb/src/components/common/AppBar';
import { NormalButton } from 'climbingweb/src/components/common/button/Button';
import {
  BackButton,
  Empty,
} from 'climbingweb/src/components/common/AppBar/IconButton';
import { StarRating } from 'climbingweb/src/components/common/StarRating';
import TextArea from 'climbingweb/src/components/common/TextArea/TextArea';
import 'react-spring-bottom-sheet/dist/style.css';
export default function ReportPage({}) {
  return (
    <section className="mb-footer">
      <AppBar leftNode={<BackButton />} title="" rightNode={<Empty />} />
      <div className="px-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-xl font-extrabold leading-6">
            리뷰를 작성해주세요
          </h2>
          <StarRating count={5} size="md" readOnly={false} initialValue={5} />
          <TextArea
            setData={() => {}}
            placeholder="요청 내용을 자세히 입력해주세요."
          />
        </div>
        <NormalButton>완료</NormalButton>
      </div>
    </section>
  );
}
