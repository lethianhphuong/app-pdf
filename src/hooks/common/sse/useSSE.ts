//4
import { useContext, useEffect, useReducer } from 'react';
import { SSEContext } from './SSEContext';
import { Event, Listener } from './source';

export interface Action<T> {
  event: Event;
  data: T;
}

export type StateReducer<S, T> = (state: S, changes: Action<T>) => S;

export type Parser<T> = (data: any) => T;

export interface Options<S, T = S> {
  stateReducer?: StateReducer<S, T>;
  parser?: Parser<T>;
  context?: typeof SSEContext;
}

export function useSSE<S, T = S>(eventName: string, initialState: S, options?: Options<S, T>): S {
  const {
    stateReducer = (_: S, action: Action<any>) => action.data,
    parser = (data: any) => JSON.parse(data),
    context = SSEContext
  } = options || {};

  const source = useContext(context);
  const [state, dispatch] = useReducer<StateReducer<S, T>>(stateReducer, initialState);

  if (!source) {
    throw new Error('Could not find an SSE context; You have to wrap useSSE() in a <SSEProvider>.');
  }

  useEffect(() => {
    const listener: Listener = (event) => {
      const data = parser(event.data);

      dispatch({
        event,
        data
      });
    };

    source.addEventListener(eventName, listener);
    return () => {
      source.removeEventListener(eventName, listener);
    };
  }, []);

  return state;
}
