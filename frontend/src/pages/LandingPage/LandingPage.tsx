import { RegistrationForm } from '@/features/registration/RegistrationForm';
import { HeroTitle } from '@/shared/ui/HeroTitle/HeroTitle';
import { Layout } from '@/shared/ui/Layout/Layout';
import { MacTerminal } from '@/widgets/MacTerminal/MacTerminal';

import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <Layout>
      <div className={styles.formColumn}>
        <h2 className={styles.formTitle}>Регистрация на мероприятие</h2>
        <RegistrationForm />
      </div>

      <div className={styles.heroColumn}>
        <HeroTitle />
        <MacTerminal />
      </div>
    </Layout>
  );
}
