import { useMemo } from 'react';

import { RegistrationStore } from '@/features/registration/RegistrationStore';
import { RegistrationStoreProvider } from '@/features/registration/RegistrationStoreContext';
import { LandingPage } from '@/pages/LandingPage/LandingPage';
import { SuccessPage } from '@/pages/SuccessPage/SuccessPage';
import { ROUTES, usePathname } from '@/shared/lib/router';

export function App() {
  const registrationStore = useMemo(() => new RegistrationStore(), []);
  const pathname = usePathname();

  return (
    <RegistrationStoreProvider store={registrationStore}>
      {pathname === ROUTES.success ? <SuccessPage /> : <LandingPage />}
    </RegistrationStoreProvider>
  );
}
