import type { ReactNode } from 'react';

import { CheckIcon } from '@/shared/icons/CheckIcon';

import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: ReactNode;
  name?: string;
  hasError?: boolean;
  align?: 'center' | 'top';
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  className = '',
  label,
  name,
  hasError = false,
  align = 'center',
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };

  const rootClassNames = [
    styles.root,
    align === 'top' ? styles.alignTop : '',
    disabled ? styles.disabled : '',
    hasError ? styles.hasError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClassNames}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <div className={`${styles.box} ${checked ? styles.checked : ''}`}>
        {checked && <CheckIcon />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
