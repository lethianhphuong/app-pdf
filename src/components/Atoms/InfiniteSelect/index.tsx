import { Form, FormItemProps, SelectProps } from 'antd';
import { Rule } from 'antd/es/form';
import { AntInfiniteSelect } from '../AntInfiniteSelect';
import { BaseInfiniteSelectProps as AntBaseInfiniteSelectProps } from '../AntInfiniteSelect/types';
import Label from '../Label';
import './index.less';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface BaseInfiniteSelectProps extends AntBaseInfiniteSelectProps {
  width?: number | string;
  label: string;
  name: FormItemProps['name'];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  restField?: FormItemProps;
}

export const InfiniteSelect: React.FC<BaseInfiniteSelectProps> = ({
  label,
  name,
  required = false,
  rules,
  config = {
    source: 'data.list',
    valueField: 'id',
    labelField: 'name',
    totalField: 'data.total'
  },
  listFn,
  detailFn,
  restField,
  ...rest
}) => {
  return (
    <Form.Item name={name} rules={generateRequiredRules(required, rules)} className='m-0' {...restField}>
      <BaseInfiniteSelect
        listFn={listFn}
        detailFn={detailFn}
        config={config}
        name={name}
        label={label}
        required={required}
        {...rest}
      />
    </Form.Item>
  );
};

export const BaseInfiniteSelect: React.FC<BaseInfiniteSelectProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize = 18,
  defaultValue,
  listFn,
  detailFn,
  config,
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
      <AntInfiniteSelect
        listFn={listFn}
        detailFn={detailFn}
        config={config}
        style={{ width: width }}
        className='gt-select'
        optionFilterProp='label'
        filterOption={false}
        clearIconSize={clearIconSize}
        defaultValue={defaultValue} // i need this when im loading detailed data
        value={value}
        onChange={setState}
        {...rest}
      />
    </Label>
  );
};
