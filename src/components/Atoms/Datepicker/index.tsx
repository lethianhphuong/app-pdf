import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import { DatePicker as AntDatePicker, DatePickerProps, Form } from 'antd';
import { Rule } from 'antd/es/form';
import Label from '../Label';
import './index.less';
import { useControllableValue } from '@/hooks';
import { DATE_FORMAT } from '@/utilities/date';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface BaseDatePickerProps extends Omit<DatePickerProps, 'name'> {
  width?: number | string;
  label: string;
  name: string | string[];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
}

export const DatePicker: React.FC<BaseDatePickerProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  clearIconSize = 18,
  rules,
  hidden,
  ...rest
}) => {
  return (
    <Form.Item name={name} rules={generateRequiredRules(required, rules)} hidden={hidden} className='m-0'>
      <BaseDatePicker
        width={width}
        name={name}
        label={label}
        required={required}
        clearIconSize={clearIconSize}
        {...rest}
      />
    </Form.Item>
  );
};

export const BaseDatePicker: React.FC<BaseDatePickerProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize,
  defaultValue,
  ...rest
}) => {
  const [, setState] = useControllableValue<DatePickerProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntDatePicker
        style={{ width: width }}
        className='gt-date-picker'
        placeholder=''
        format={DATE_FORMAT}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        suffixIcon={<CalendarOutlined style={{ fontSize: clearIconSize }} />}
        value={value}
        onChange={setState}
        {...rest}
      />
    </Label>
  );
};
