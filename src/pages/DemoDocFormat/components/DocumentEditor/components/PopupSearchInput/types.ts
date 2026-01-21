import { DefaultOptionType, SelectProps } from 'antd/es/select';
import { DropdownOption, SearchInputConfig } from '../../types';

export type DocumentValueTransfrom =
  | ((option: DefaultOptionType) => DropdownOption)
  | ((option: DefaultOptionType[]) => DropdownOption[]);

export interface PopupSearchInputProps extends SelectProps {
  handleChange: (value: DropdownOption | DropdownOption[], fieldOption?: SearchInputConfig) => void;
  config: SearchInputConfig;
  currentValue?: DropdownOption;
  defaultOptions?: DefaultOptionType[];
}
