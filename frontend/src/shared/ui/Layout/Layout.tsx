import type { ReactNode } from 'react';

import styles from './Layout.module.css';

export interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}
