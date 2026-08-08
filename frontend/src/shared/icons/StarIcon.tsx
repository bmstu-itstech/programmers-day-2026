import type { SVGProps } from 'react';

export interface StarIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  hasError?: boolean;
}

export function StarIcon({
  width = 10,
  height = 9,
  hasError = false,
  ...props
}: StarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 9"
      fill="none"
      {...props}
    >
      <path
        d="M3.45999 6.67572e-06H5.57999L5.45999 3.12001L8.39999 2.00001L9.03999 4.02001L6.01999 4.90001L8.03999 7.38001L6.31999 8.62001L4.51999 6.00001L2.71999 8.62001L0.99999 7.38001L2.99999 4.90001L-9.71556e-06 4.02001L0.63999 2.00001L3.59999 3.12001L3.45999 6.67572e-06Z"
        fill={hasError ? '#FF4D4D' : '#00CAF1'}
      />
    </svg>
  );
}
