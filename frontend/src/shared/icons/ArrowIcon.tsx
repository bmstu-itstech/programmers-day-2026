import type { SVGProps } from 'react';

export interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export function ArrowIcon({
  width = 10,
  height = 10,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      {...props}
    >
      <path
        d="M-2.67869e-05 1.17741e-05L2.07997 1.18694e-05L5.23997 8.44001L4.07997 8.44001L7.23997 1.21058e-05L9.31997 1.22011e-05L5.73997 9.22001L3.57997 9.22001L-2.67869e-05 1.17741e-05Z"
        fill="#00CAF1"
      />
    </svg>
  );
}
