import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowIcon } from '@/shared/icons/ArrowIcon';

import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  name?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Выберите из списка...',
  className = '',
  disabled = false,
  hasError = false,
  name,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;

  const handleSelect = useCallback(
    (val: string) => {
      onChange?.(val);
      setIsOpen(false);
    },
    [onChange],
  );

  const toggleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const triggerClassNames = [
    styles.trigger,
    isOpen ? styles.isOpen : '',
    hasError ? styles.hasError : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClassNames = [
    styles.text,
    isPlaceholder ? styles.isPlaceholder : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {name && <input type="hidden" name={name} value={value ?? ''} />}
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={triggerClassNames}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={textClassNames}>{displayLabel}</span>
        <ArrowIcon className={styles.arrow} />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${
                option.value === value ? styles.isSelected : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
