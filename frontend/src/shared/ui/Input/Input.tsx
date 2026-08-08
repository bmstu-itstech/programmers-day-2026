import { type InputHTMLAttributes, forwardRef } from 'react';

import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', hasError = false, ...props }, ref) => {
    const classNames = [
      styles.input,
      hasError ? styles.hasError : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} className={classNames} {...props} />;
  },
);

Input.displayName = 'Input';
