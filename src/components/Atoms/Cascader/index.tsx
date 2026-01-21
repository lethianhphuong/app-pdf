import React, { ReactNode } from 'react';
import { CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import { Cascader as AntCascader, Form, Tooltip } from 'antd';
import { SingleCascaderProps } from 'antd/es/cascader';
import { Rule } from 'antd/es/form';
import { isArray, isString } from 'lodash';
import { DisplayValueType } from 'rc-select/lib/BaseSelect';
import { EachElement } from '../EachElement';
import Label from '../Label';
import './styles.less';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface Option {
  value?: string | number;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

export interface BaseCascaderProps extends Omit<SingleCascaderProps, 'multiple'> {
  width?: number | string;
  label: string;
  name: string | number | (string | number)[];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  initialValue?: string;
  multiple?: boolean;
  [x: string]: any;
}

// Render cho đến khi tìm thấy ký tự | đầu tiên
const RealLabelElement = ({ items }: { items: (string | ReactNode)[] }) => {
  const result = [];
  let found = false;

  for (const item of items) {
    if (found) break;

    if (isString(item) && item.includes('|')) {
      result.push(item.split('|')[0]);
      found = true;
      continue;
    }

    result.push(item);
  }

  return <span>{result}</span>;
};

export const Cascader: React.FC<BaseCascaderProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  rules,
  initialValue,
  ...rest
}) => {
  return (
    <Form.Item name={name} rules={generateRequiredRules(required, rules)} className='m-0' initialValue={initialValue}>
      <BaseCascader style={{ width: width }} name={name} label={label} required={required} {...rest} />
    </Form.Item>
  );
};

export const BaseCascader: React.FC<BaseCascaderProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize = 18,
  defaultValue,
  multiple = false,
  ...rest
}) => {
  const [, setState] = useControllableValue<SingleCascaderProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = multiple ? value && value.length > 0 : !!value;
  const hasValue = true;
  const maxTagCount = multiple ? 'responsive' : undefined;

  const suffixIcon = (
    <CaretDownOutlined
      aria-label='down'
      className='anticon-down ant-select-suffix'
      style={{ fontSize: clearIconSize }}
    />
  ) as any;

  function renderMaxTagPlaceholder(omittedValues: DisplayValueType[]) {
    return (
      <Tooltip
        title={
          <ul className='m-0 ps-4'>
            <EachElement of={omittedValues} render={(item, index) => <li key={index}>{item?.label}</li>} />
          </ul>
        }
      >
        +{omittedValues.length}...
      </Tooltip>
    );
  }

  function renderOptions(option: Option) {
    const label = isArray(option.label)
      ? option.label
          .map((item) => {
            return isArray(item)
              ? item
                  .map((i) => (isString(i) ? i : i?.props?.children))
                  .join('')
                  .split('|')[0]
              : item.replace('/', '>');
          })
          .join('')
      : (option.label as string)?.split('|')[0];

    const labelEl = isArray(option.label) ? (
      <span>
        {option.label.map((item) => {
          return isArray(item) ? <RealLabelElement items={item} /> : item.replace('/', '>');
        })}
      </span>
    ) : (
      (option.label as string)?.split('|')[0]
    );

    return (
      <p title={label as string} className='m-0 max-w-48 overflow-hidden text-ellipsis'>
        {labelEl}
      </p>
    );
  }

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntCascader
        className='gt-cascader'
        style={{ width: width }}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        suffixIcon={suffixIcon}
        value={value}
        onChange={setState}
        optionRender={renderOptions}
        multiple={multiple}
        maxTagCount={maxTagCount}
        dropdownClassName='gt-cascader-menus'
        maxTagPlaceholder={renderMaxTagPlaceholder}
        {...rest}
      />
    </Label>
  );
};
