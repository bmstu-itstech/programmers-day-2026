import { HeroTitle } from '@/shared/ui/HeroTitle/HeroTitle';

import styles from './SuccessPage.module.css';

export function SuccessPage() {
  return (
    <main className={styles.page}>
      <HeroTitle align="center" className={styles.hero}>Спасибо за регистрацию</HeroTitle>
    </main>
  );
}
