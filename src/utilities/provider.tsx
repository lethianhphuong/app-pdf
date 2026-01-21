import React, { ReactNode, useState } from 'react';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [client] = useState(() => new QueryClient({}));

  const persister = createSyncStoragePersister({
    // storage: typeof window !== 'undefined' ? window.localStorage : undefined
    storage: window.sessionStorage,
    key: 'danh-muc'
  });

  return (
    <PersistQueryClientProvider client={client} persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000 }}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
