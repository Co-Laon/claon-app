import { SVGProps } from 'react';

export function StarGray({
  width = 24,
  height = 23,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0L16.0791 6.95456L24 8.6579L18.6 14.6594L19.4164 22.6667L12 19.4212L4.58363 22.6667L5.40004 14.6594L4.15444e-05 8.6579L7.92102 6.95456L12 0Z"
        fill="#E6E6E6"
      />
    </svg>
  );
}
