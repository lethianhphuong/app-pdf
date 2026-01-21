import { MutableRefObject, ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const DrawerContext = createContext({});

export type DrawerProviderType<T> = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  drawerStorage?: T;
  clearDrawerStorage: () => void;
  updateDrawerStorage: (value: UpdateDrawerStorage<T>) => void;
  documentEditorRef: MutableRefObject<Nullable<{ onSave: () => Promise<void> }>>;
  pdfViewerRef: MutableRefObject<Nullable<{ onSave: () => Promise<void> }>>;
  loadingDocumentKey?: string;
  setLoadingDocumentKey: (value?: string) => void;
  processKey: Record<
    string,
    {
      shouldHandle: boolean;
      data?: any;
      afterSave?: (data?: any) => Promise<void>;
    }
  >;
  setProcessKey: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          shouldHandle: boolean;
          data?: any;
          afterSave?: (data?: any) => Promise<void>;
        }
      >
    >
  >;
};

type UpdateDrawerStorage<S> = S | ((prevDrawerStorage?: S) => S);

export function useDrawerProvider<T>(): DrawerProviderType<T> {
  const DrawerProvider = useContext(DrawerContext) as DrawerProviderType<T>;
  if (DrawerProvider === undefined) {
    throw new Error('useDrawerProvider must be used within DrawerContext.Provider');
  }
  return DrawerProvider;
}

export function DrawerProvider<T>({ children }: { children: ReactNode }) {
  const [drawerStorage, setDrawerStorage] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDocumentKey, setLoadingDocumentKeyState] = useState<string>();
  const [processKey, setProcessKey] = useState<
    Record<string, { shouldHandle: boolean; data?: any; afterSave?: (data?: any) => Promise<void> }>
  >({});

  const documentEditorRef = useRef(null);
  const pdfViewerRef = useRef(null);

  useEffect(() => {
    Object.entries(processKey).forEach(([key, value]) => {
      if (!key || !value.shouldHandle || loadingDocumentKey) return;
      try {
        value.afterSave && value.afterSave(value.data);
      } catch (error) {
        console.error(error);
      } finally {
        setProcessKey({});
      }
    });
  }, [processKey, loadingDocumentKey]);

  function clearDrawerStorage() {
    setDrawerStorage(undefined);
  }

  function updateDrawerStorage(value: UpdateDrawerStorage<T>) {
    setDrawerStorage(value);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  // Chặn nếu đang có văn bản loading thì không cho set value mới, chỉ cho clear value
  function setLoadingDocumentKey(value?: string) {
    if (!!value && !!loadingDocumentKey) return;
    setLoadingDocumentKeyState(value);
  }

  const value: DrawerProviderType<T> = useMemo(
    () => ({
      loading,
      startLoading,
      stopLoading,
      drawerStorage,
      clearDrawerStorage,
      updateDrawerStorage,
      documentEditorRef,
      pdfViewerRef,
      loadingDocumentKey,
      setLoadingDocumentKey,
      processKey,
      setProcessKey
    }),
    [
      loading,
      startLoading,
      stopLoading,
      drawerStorage,
      clearDrawerStorage,
      updateDrawerStorage,
      documentEditorRef,
      pdfViewerRef,
      loadingDocumentKey,
      setLoadingDocumentKey,
      processKey,
      setProcessKey
    ]
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}
