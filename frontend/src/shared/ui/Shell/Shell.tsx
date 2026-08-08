import type { ReactNode } from 'react';

import styles from './Shell.module.css';

export interface ShellProps {
  children: ReactNode;
  className?: string;
  hasError?: boolean;
}

export function Shell({ children, className = '', hasError = false }: ShellProps) {
  const classNames = [
    styles.shell,
    hasError ? styles.hasError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
