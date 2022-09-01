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
    .map((star, idx) => (idx % 2 === 0 ? star : star + 1))
    .map(String);

  const [value, setValue] = useState(initialValue);

  const handleCheck = (num: number) => {
    if (!readOnly) setValue(num / 2);
    console.log(value);
  };
  return (
    <>
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
            className={`bg-yellow-500 mask mask-star-2 mask-half-${star}`}
          />
        ))}
      </form>
    </>
  );
};
