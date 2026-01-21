import { useState } from 'react';
import useEventEmitter, { EventEmitter } from './useEventEmitter';

export function useDrawer<T>() {
  const ref$ = useEventEmitter<{ data?: T; visible: boolean }>();

  const open = (data?: T) => {
    ref$.emit({ data: data, visible: true });
  };

  const close = () => {
    ref$.emit({ data: undefined, visible: false });
  };

  return {
    ref$,
    open,
    close
  };
}

export function useDrawerInner<T>(
  ref$: EventEmitter<{ data?: T; visible: boolean }>,
  afterOpen: (data?: T) => Promise<void> | void,
  options?: { defaultVisible: boolean }
) {
  const [visible, setVisible] = useState(options?.defaultVisible);

  ref$?.useSubscription((data) => {
    afterOpen(data.data);
    setVisible(data.visible);
  });

  const close = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  return {
    ref$,
    close,
    open,
    visible
  };
}
