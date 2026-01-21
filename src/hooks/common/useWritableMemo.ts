import { useCallback, useMemo } from 'react';

interface UseWritableMemoProps<Type> {
  get(): Type;
  set(value: Type): void;
}

export function useWritableMemo<Type>({ get, set }: UseWritableMemoProps<Type>, deps: any[]) {
  const state = useMemo(get, deps);

  const setState = useCallback(set, deps);

  return [state, setState];
}
