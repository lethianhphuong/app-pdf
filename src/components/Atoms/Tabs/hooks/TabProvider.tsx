import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

const TabContext = createContext({});

export type TabProviderType<T> = {
  tabStorage: T;
  clearTabStorage: () => void;
  updateTabStorage: (values: T) => void;
};

export function useTabProvider<T>(): TabProviderType<T> {
  const tabProvider = useContext(TabContext) as TabProviderType<T>;
  if (tabProvider === undefined) {
    throw new Error('useTabProvider must be used within TabContext.Provider');
  }
  return tabProvider;
}

export function TabProvider<T>({ children }: { children: ReactNode }) {
  const [tabStorage, setTabStorage] = useState<T | null>(null);

  function clearTabStorage() {
    setTabStorage(null);
  }

  function updateTabStorage(values: Nullable<T>) {
    setTabStorage(values);
  }

  const value: TabProviderType<Nullable<T>> = useMemo(
    () => ({
      tabStorage,
      clearTabStorage,
      updateTabStorage
    }),
    [tabStorage, clearTabStorage, updateTabStorage]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}
