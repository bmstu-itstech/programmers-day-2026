import { type FC, type ReactNode, createContext, useContext } from 'react';

import type { RegistrationStore } from './RegistrationStore';

const RegistrationStoreContext = createContext<RegistrationStore | null>(null);

export function useRegistrationStore(): RegistrationStore {
  const store = useContext(RegistrationStoreContext);

  if (!store) {
    throw new Error(
      'useRegistrationStore must be used within RegistrationStoreProvider',
    );
  }

  return store;
}

interface RegistrationStoreProviderProps {
  store: RegistrationStore;
  children: ReactNode;
}

export const RegistrationStoreProvider: FC<RegistrationStoreProviderProps> = ({
  store,
  children,
}) => {
  return (
    <RegistrationStoreContext.Provider value={store}>
      {children}
    </RegistrationStoreContext.Provider>
  );
};
