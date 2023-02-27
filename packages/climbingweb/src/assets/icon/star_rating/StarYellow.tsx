import { SVGProps } from 'react';

export default function StarYellow({
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
        d="M12 0L16.079 6.95456L24 8.6579L18.6 14.6594L19.4164 22.6667L12 19.4212L4.58359 22.6667L5.4 14.6594L0 8.6579L7.92097 6.95456L12 0Z"
        fill="#FFCB45"
      />
    </svg>
  );
}
