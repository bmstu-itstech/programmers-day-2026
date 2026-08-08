import type { CSSProperties, ReactNode } from 'react';

import styles from './TerminalPrompt.module.css';

export interface TerminalPromptProps {
  user?: string;
  path?: string;
  command?: ReactNode;
  showCursor?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function TerminalPrompt({
  user = 'stud_iu',
  path = '~',
  command,
  showCursor = false,
  style,
  className = '',
}: TerminalPromptProps) {
  return (
    <div
      className={`${styles.promptLine} ${className}`}
      style={style}
    >
      <span className={styles.user}>{user}:</span>
      <span className={styles.path}>{path}</span>
      <span className={styles.symbol}> $ </span>
      {command}
      {showCursor && <span className={styles.cursor} />}
    </div>
  );
}
