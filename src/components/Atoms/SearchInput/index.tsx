import React from 'react';
import { CaretDownOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, FormItemProps, SelectProps } from 'antd';
import { Rule } from 'antd/es/form';
import groupClassNames from 'classnames';
import { AntSearchInput } from '../AntSearchInput';
import { AntSearchInputProps } from '../AntSearchInput/types';
import Label from '../Label';
import './index.less';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface BaseSearchInputProps extends Omit<AntSearchInputProps, 'className'> {
  width?: number | string;
  label: string;
  name: FormItemProps['name'];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  classNames?: {
    formItem?: string;
    component?: string;
  };
  formItemField?: Omit<FormItemProps, 'className'>;
}

export const SearchInput: React.FC<BaseSearchInputProps> = ({
  label,
  name,
  required = false,
  rules,
  config = {
    source: 'data.list',
    valueField: 'id',
    labelField: 'name'
  },
  searchFn,
  detailFn,
  defaultValue,
  classNames,
  formItemField,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={generateRequiredRules(required, rules)}
      className={groupClassNames('m-0', classNames?.formItem)}
      {...formItemField}
    >
      <BaseSearchInput
        name={name}
        label={label}
        searchFn={searchFn}
        detailFn={detailFn}
        required={required}
        config={config}
        defaultValue={defaultValue}
        classNames={classNames}
        {...rest}
      />
    </Form.Item>
  );
};

export const BaseSearchInput: React.FC<BaseSearchInputProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize = 18,
  defaultValue,
  searchFn,
  detailFn,
  config,
  style,
  classNames,
  ...rest
}) => {
  const [, setState] = useControllableValue<SelectProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntSearchInput
        searchFn={searchFn}
        detailFn={detailFn}
        config={config}
        style={{ width: width, ...style }}
        className={groupClassNames('gt-select', classNames?.component)}
        optionFilterProp='label'
        filterOption={false}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        suffixIcon={
          rest.loading ? (
            <LoadingOutlined style={{ fontSize: clearIconSize }} />
          ) : (
            <CaretDownOutlined
              aria-label='down'
              className='anticon-down ant-select-suffix'
              style={{ fontSize: clearIconSize }}
            />
          )
        }
        defaultValue={defaultValue} // i need this when im loading detailed data
        value={value}
        onChange={setState}
        {...rest}
      />
    </Label>
  );
};
