import type { SVGProps } from 'react';

export interface CheckIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export function CheckIcon({
  width = 14,
  height = 12,
  ...props
}: CheckIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 12"
      fill="none"
      {...props}
    >
      <path
        d="M13.2087 0.44104C13.6646 0.814041 13.732 1.48608 13.3591 1.94202L6.08468 10.8326C5.4286 11.6342 4.25714 11.7764 3.42843 11.1549L0.626677 9.05334C0.155451 8.69987 0.0603409 8.03144 0.413786 7.56018C0.767253 7.08901 1.43571 6.99293 1.90695 7.34631L4.55636 9.33264L11.7077 0.59143C12.0807 0.135542 12.7528 0.0681435 13.2087 0.44104Z"
        fill="white"
        stroke="white"
        strokeWidth="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
