import type { ReactNode } from 'react';

import { StarIcon } from '@/shared/icons/StarIcon';

import styles from './Field.module.css';

export interface FieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function Field({
  label,
  required = false,
  error,
  className = '',
  children,
}: FieldProps) {
  const hasError = Boolean(error);

  const containerClassNames = [
    styles.container,
    hasError ? styles.hasError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames}>
      {label && (
        <div className={styles.labelRow}>
          <span className={styles.labelText}>{label}</span>
          {required && <StarIcon hasError={hasError} />}
        </div>
      )}

      {children}

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}
