import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import { DatePicker, Form, FormItemProps, GetProps } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import classNames from 'classnames';
import Label from '../Label';
import './style.less';
import { useControllableValue } from '@/hooks';
import { DATE_FORMAT } from '@/utilities/date';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

export interface BaseRangePickerProps extends Omit<RangePickerProps, 'name'> {
  width?: number | string;
  label: string;
  name: string | number | (string | number)[];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  labelRequired?: boolean;
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  validateFirst?: boolean | 'parallel';
  dependencies?: NamePath[];
  initialValue?: string[];
  restField?: FormItemProps;
}

export const DateRangePicker: React.FC<BaseRangePickerProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  clearIconSize = 18,
  rules,
  initialValue,
  validateTrigger,
  validateDebounce,
  validateFirst = true,
  dependencies,
  restField,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={generateRequiredRules(required, rules)}
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      validateFirst={validateFirst}
      dependencies={dependencies}
      initialValue={initialValue}
      className='m-0'
      {...restField}
    >
      <BaseDateRangePicker
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

export const BaseDateRangePicker: React.FC<BaseRangePickerProps> = ({
  value,
  onChange,
  required,
  labelRequired = false,
  label,
  name,
  width,
  clearIconSize,
  defaultValue,
  className,
  ...rest
}) => {
  const [, setState] = useControllableValue<RangePickerProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required || labelRequired}>
      <RangePicker
        style={{ width: width }}
        className={classNames('gt-range-picker', className)}
        format={DATE_FORMAT}
        placeholder={['', '']}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        suffixIcon={<CalendarOutlined style={{ fontSize: clearIconSize }} />}
        value={value}
        onChange={setState}
        {...rest}
      />
    </Label>
  );
};
