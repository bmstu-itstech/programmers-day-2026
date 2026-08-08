import type { ReactNode } from 'react';

import styles from './HeroTitle.module.css';

export interface HeroTitleProps {
  children?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function HeroTitle({
  children = 'День Программиста',
  align = 'left',
  className = '',
}: HeroTitleProps) {
  return (
    <div className={`${styles.container} ${styles[align]} ${className}`}>
      <h1 className={styles.title}>{children}</h1>
      <div className={styles.line} />
    </div>
  );
}
