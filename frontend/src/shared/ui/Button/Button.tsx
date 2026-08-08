import { type ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth = true,
      className = '',
      children = 'Отправить заявку',
      ...props
    },
    ref,
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
