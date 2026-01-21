import { DefaultOptionType } from 'antd/es/select';
import { DropdownOption } from '../../types';
import { AntSearchInputProps } from '@/components/Atoms';
import { isArray } from '@/utilities/typeof';

export const getDocumentValueByOption = (
  option: DefaultOptionType | DefaultOptionType[],
  fieldConfig: AntSearchInputProps['config']
): DropdownOption | DropdownOption[] => {
  if (isArray(option)) {
    return option.map((item) => optionToDocumentValue(item, fieldConfig));
  }
  return optionToDocumentValue(option, fieldConfig);
};

export const optionToDocumentValue = (option: DefaultOptionType, fieldConfig: AntSearchInputProps['config']) => {
  return {
    value: option.value as string,
    label: option.label as string,
    text: option?.fullData?.[fieldConfig?.textField as string] ?? option.label,
    fullData: option.fullData
  };
};
