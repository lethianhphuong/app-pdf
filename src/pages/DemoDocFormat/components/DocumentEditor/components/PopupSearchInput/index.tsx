import { useEffect, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { DropdownOption } from '../../types';
import { getDocumentValueByOption } from './helper';
import { PopupSearchInputProps } from './types';
import { AntSearchInput } from '@/components/Atoms';
import { isArray } from '@/utilities/typeof';

const getOptionFromDocumentEditorOption = (dropdownOption: DropdownOption) => {
  return {
    label: dropdownOption?.label,
    text: dropdownOption?.label,
    value: dropdownOption?.value,
    fullData: dropdownOption?.fullData
  };
};

const PopupSearchInput = ({ currentValue, handleChange, config, ...rest }: PopupSearchInputProps) => {
  const [value, setValue] = useState<DropdownOption | DropdownOption[] | undefined>([]);
  const { searchFn, fieldConfig } = config;
  const [defaultOptions, setDefaultOptions] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (!currentValue) return;

    isArray(currentValue)
      ? setDefaultOptions(currentValue.map((item) => getOptionFromDocumentEditorOption(item)))
      : setDefaultOptions([getOptionFromDocumentEditorOption(currentValue)]);
  }, []);

  return (
    <AntSearchInput
      searchFn={searchFn}
      config={fieldConfig}
      mode={config.multiSelect ? 'multiple' : undefined}
      open
      allowClear
      showSearch
      autoFocus
      value={value}
      style={{ width: 288 }}
      placeholder={config.name}
      defaultOptions={defaultOptions}
      onChange={(value, option: DefaultOptionType | DefaultOptionType[]) => {
        setValue(value);
        handleChange && handleChange(getDocumentValueByOption(option, fieldConfig), config);
      }}
      {...rest}
    />
  );
};

export default PopupSearchInput;
