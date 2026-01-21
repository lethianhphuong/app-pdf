import { ReactElement } from 'react';

export interface EachElementProps {
  of: any[];
  render: (item: any, index: number, array: any[]) => ReactElement;
}
