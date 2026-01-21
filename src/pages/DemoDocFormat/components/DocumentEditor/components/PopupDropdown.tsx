import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib';
import { DropdownConfig, DropdownOption } from '../types';

interface PopupDropdownProps extends SelectProps {
  handleChange: (value: any, fieldOption?: DropdownConfig) => void;
  currentValue: any;
  config: DropdownConfig;
}

const PopupDropdown = ({ currentValue, handleChange, config, ...rest }: PopupDropdownProps) => {
  const [value, setValue] = useState<DropdownOption[]>([]);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <Select
      mode={config.multiSelect ? 'multiple' : undefined}
      open
      allowClear
      showSearch
      autoFocus
      value={value}
      style={{ width: 288 }}
      optionFilterProp='label'
      placeholder={config.name}
      options={config.data}
      onChange={(value, option) => {
        setValue(value);
        handleChange && handleChange(option, config);
      }}
      {...rest}
    />
  );
};

export default PopupDropdown;
