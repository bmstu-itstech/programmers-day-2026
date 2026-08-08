import type { ReactNode } from 'react';

import { TerminalPrompt } from '@/shared/ui/TerminalPrompt/TerminalPrompt';

import styles from './MacTerminal.module.css';

export interface MacTerminalProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

export function MacTerminal({
  title = 'stud_iu@macmini — zsh — 120×30',
  className = '',
  children,
}: MacTerminalProps) {
  return (
    <div className={`${styles.terminal} ${className}`}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <span className={`${styles.btn} ${styles.btnClose}`} aria-hidden="true" />
          <span className={`${styles.btn} ${styles.btnMinimize}`} aria-hidden="true" />
          <span className={`${styles.btn} ${styles.btnMaximize}`} aria-hidden="true" />
        </div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.login}>
          Last login: Wed Mar 18 18:23:40 on ttys000
        </div>

        <TerminalPrompt
          command={
            <>
              <span className={styles.cmd}>cat </span>
              <span className={styles.argRed}>/info.txt</span>
            </>
          }
        />

        <div className={styles.textBlock}>
          &gt; День программиста — это московский фестиваль информационных
          технологий от Студсовета факультета ИУ, проводимый третий год
          подряд. В 2026 году фестиваль пройдет 14 сентября во дворе
          Конгресс-центра.
        </div>

        <TerminalPrompt command={<span className={styles.cmd}>ls -la</span>} />

        <div className={styles.lsLine}>
          <span className={styles.cyan}>drwxr-xr-x</span>  12 stud_iu  staff  384 Sep 14 10:23 <span className={styles.cyan}>.</span>
        </div>
        <div className={styles.lsLine}>
          <span className={styles.cyan}>drwxr-xr-x</span>   6 stud_iu  staff  192 Sep 14 09:41 <span className={styles.cyan}>..</span>
        </div>
        <div className={styles.lsLine}>
          <span className={styles.cyan}>drwxr-xr-x</span>   8 stud_iu  staff  256 Sep 14 10:23 <span className={styles.cyan}>src</span>
        </div>
        <div className={styles.lsLine}>
          <span className={styles.red}>-rw-r--r--</span>   1 stud_iu  staff  1247 Sep 14 14:05 <span className={styles.red}>README.md</span>
        </div>

        {children}

        <TerminalPrompt showCursor className={styles.noMargin} />
      </div>
    </div>
  );
}
