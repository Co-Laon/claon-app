import { useState } from 'react';

interface RatingProps {
  count: number;
  readOnly?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  initialValue: number;
}

export const StarRating = ({
  count,
  readOnly = false,
  size = 'md',
  initialValue,
}: RatingProps) => {
  const stars = Array(count * 2)
    .fill(1)
    .map((star, idx) => (idx % 2 === 0 ? star : star + 1));

  // tailwind jit 모드 버그로 인한 것으로 판단되어 임시 해결책 사용
  const leftHalf = 'bg-yellow-500 mask mask-star-2 mask-half-1';
  const rightHalf = 'bg-yellow-500 mask mask-star-2 mask-half-2';

  const [value, setValue] = useState(initialValue);

  const handleCheck = (num: number) => {
    if (!readOnly) setValue(num / 2);
    console.log(value);
  };

  return (
    <form className={`rating rating-${size} rating-half relative`}>
      {stars.map((star, idx) => (
        <input
          key={`rating${idx}`}
          type="radio"
          name="rating"
          multiple
          readOnly={readOnly}
          checked={value * 2 >= idx + 1}
          onChange={() => handleCheck(idx + 1)}
          className={star % 2 === 0 ? rightHalf : leftHalf}
        />
      ))}
    </form>
  );
};
