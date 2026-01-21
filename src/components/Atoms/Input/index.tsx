import { CloseOutlined } from '@ant-design/icons';
import { Input as AntInput, Form, InputProps } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { FormItemProps } from 'antd/lib';
import groupClassNames from 'classnames';
import Label from '../Label';
import './index.less';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';
import { toCapitalize } from '@/utilities/string';

export type InputValueType = string | number | readonly string[] | undefined;
export interface BaseInputProps extends Omit<InputProps, 'name' | 'onChange'> {
  width?: number | string;
  label: string;
  name: string | number | (string | number)[];
  clearIconSize?: number | string;
  required?: boolean;
  initialValue?: string;
  rules?: Rule[];
  onChange?: (value: string) => void;
  autoTrim?: boolean;
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  validateFirst?: boolean | 'parallel';
  dependencies?: NamePath[];
  restField?: FormItemProps;
  capitalize?: boolean;
}
export const Input: React.FC<BaseInputProps> = ({
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
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      name={name}
      rules={generateRequiredRules(required, rules)}
      className='m-0'
      initialValue={initialValue}
      validateFirst={validateFirst}
      dependencies={dependencies}
      {...restField}
    >
      <BaseInput width={width} name={name} label={label} required={required} clearIconSize={clearIconSize} {...rest} />
    </Form.Item>
  );
};

export const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize,
  defaultValue,
  onBlur,
  className,
  classNames,
  autoTrim = true,
  capitalize = false,
  ...rest
}) => {
  const [, setState] = useControllableValue<InputValueType>(omitNil({ value, onChange }), omitNil({ defaultValue }));

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required} placeholder={value as string}>
      <AntInput
        style={{ width: width }}
        className={groupClassNames('gt-input', className)}
        type='text'
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        value={value}
        onChange={(e) => setState(e.target?.value)}
        onBlur={(e) => {
          onBlur && onBlur(e);
          const value = e.target.value;
          const trimValue = value?.trim();
          const needTrim = autoTrim && trimValue !== value;
          if (needTrim && capitalize) setState(toCapitalize(trimValue));
          else if (needTrim && !capitalize) setState(trimValue);
          else if (!needTrim && capitalize) setState(toCapitalize(value));
        }}
        classNames={{
          ...classNames,
          input: groupClassNames(capitalize ? 'capitalize' : undefined, classNames?.input)
        }}
        {...rest}
      />
    </Label>
  );
};
