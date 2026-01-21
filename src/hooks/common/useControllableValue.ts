import { useMemo, useRef } from 'react';
import type { SetStateAction } from 'react';
import { useMemoizedFn } from './useMemoizedFn';
import { useUpdate } from './useUpdate';
import { isFunction } from '@/utilities/typeof';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export type Props = Record<string, any>;

export interface StandardProps<T> {
  value: T;
  defaultValue?: T;
  onChange: (val: T) => void;
}

/**
 * if no value in props, it manages state by self.
 *
 * if value in props, it manages state by parent.
 *
 * if onChange in props, onChange will be trigger when state change.
 */
export function useControllableValue<T = any>(props: StandardProps<T>): [T, (v: SetStateAction<T>) => void];
export function useControllableValue<T = any>(
  props?: Props,
  options?: Options<T>
): [T, (v: SetStateAction<T>, ...args: any[]) => void];
export function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange'
  } = options;

  const value = props[valuePropName] as T;
  // eslint-disable-next-line no-prototype-builtins
  const isControlled = props.hasOwnProperty(valuePropName);

  const initialValue = useMemo(() => {
    if (isControlled) return value;

    // eslint-disable-next-line no-prototype-builtins
    if (props.hasOwnProperty(defaultValuePropName)) return props[defaultValuePropName];

    return defaultValue;
  }, []);

  const stateRef = useRef(initialValue);
  if (isControlled) stateRef.current = value;

  const update = useUpdate();

  function setState(v: SetStateAction<T>, ...args: any[]) {
    const r = isFunction(v) ? v(stateRef.current) : v;

    if (!isControlled) {
      stateRef.current = r;
      update();
    }
    if (props[trigger]) {
      props[trigger](r, ...args);
    }
  }

  return [stateRef.current, useMemoizedFn(setState)] as const;
}
