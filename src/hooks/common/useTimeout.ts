import { useCallback, useRef, useState } from 'react';

type Fn = (...args: any) => any;

export function useTimeout<F extends Fn>(callback: F, time: number) {
  const fn = useRef(callback);
  fn.current = callback;

  const setTimeoutState = useState<NodeJS.Timeout>()[1];

  const run = useCallback(
    (...args: Parameters<F>) => {
      cancel();
      setTimeoutState(
        setTimeout(() => {
          return fn.current(...args);
        }, time)
      );
    },
    [fn.current, time]
  );

  const cancel = useCallback(() => {
    setTimeoutState((old) => {
      if (old) {
        clearTimeout(old);
      }

      return undefined;
    });
  }, []);

  return {
    run,
    cancel
  };
}
