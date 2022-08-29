import { ReviewCommment } from '../../Comments/ReviewComment';
import { StarRating } from '../../common/StarRating';

interface ReviewProps {
  rank?: number;
}

export const CenterReview = ({ rank }: ReviewProps) => {
  const count = 5;
  rank = 4.3;
  const test = {
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur accusamus esse delectus laboriosam, corporis obcaecati sit, quis ab magni, voluptate culpa. Officiis ea quibusdam animi? Ab excepturi similique obcaecati explicabo!',
    isDeleted: false,
    writerNickName: '이민수als95',
    writerProfileImage:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createAt: '22.01.23.12:34',
  };
  const list = [test, test, test, test];

  return (
    <div className="w-full px-5">
      <div className="flex flex-row justify-between items-center py-5">
        <div className="flex items-center gap-2">
          <span className="text-black text-sm">
            <span className="text-purple-500">{rank}</span>/ {count}
          </span>
          <StarRating count={count} initialValue={3} size="sm" />
        </div>
        <button className="w-16 h-6 bg-purple-500 rounded-lg text-white text-xs">
          리뷰 작성
        </button>
      </div>
      <div>
        {list.map(
          ({
            content,
            isDeleted,
            writerNickName,
            writerProfileImage,
            createAt,
          }) => (
            <ReviewCommment
              key={writerNickName}
              content={content}
              isDeleted={isDeleted}
              writerNickName={writerNickName}
              writerProfileImage={writerProfileImage}
              createAt={createAt}
            />
          )
        )}
      </div>
    </div>
  );
};
