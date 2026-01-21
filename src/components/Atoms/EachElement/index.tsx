import { Children } from 'react';
import { EachElementProps } from './types';

export const EachElement: React.FC<EachElementProps> = ({ render, of }) => {
  return Children.toArray(of.map((item, index, array) => render(item, index, array)));
};
