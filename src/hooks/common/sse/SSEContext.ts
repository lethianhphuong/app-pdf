import { PropsWithChildren, createContext, createElement, useState } from 'react';
import { SourceManager, createSourceManager } from './createSourceManager';
import { Source } from './source';

export const SSEContext = createContext<Nullable<SourceManager>>(null);
export const SSEConsumer = SSEContext.Consumer;

export interface WithSource {
  source: () => Source;
}

export interface WithEndpoint {
  endpoint: string;
}

export type Props = PropsWithChildren<WithSource | WithEndpoint>;

const isPropsWithSource = (_: WithSource | WithEndpoint): _ is WithSource => 'source' in _;

const createDefaultStore = (endpoint: string) => (): Source => new window.EventSource(endpoint);

export const SSEProvider: React.FC<Props> = ({ children, ...props }) => {
  const [source] = useState(() =>
    createSourceManager(!isPropsWithSource(props) ? createDefaultStore(props.endpoint) : props.source)
  );

  return createElement(SSEContext.Provider, { value: source }, children);
};
