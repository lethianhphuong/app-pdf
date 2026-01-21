import { ReactNode } from 'react';
import { SelectProps } from 'antd';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';

export interface OptionData extends Omit<DefaultOptionType, 'children'> {
  others?: {
    [key: string]: string;
  };
  children?: ReactNode;
}

export interface BaseSearchSelectProps extends Omit<SelectProps, 'options' | 'onChange'> {
  fetchData: (input?: string) => Promise<OptionData[]>;
  label: string;
  name: string | number | (string | number)[];
  width?: number | string;
  required?: boolean;
  rules?: Rule[];
  initialValue?: string;
  clearIconSize?: number;
  onChange?: (value: OptionData | string, option: OptionData) => void;
}
