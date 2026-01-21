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

export type InputPasswordValueType = string | number | readonly string[] | undefined;
export interface BaseInputPasswordProps extends Omit<InputProps, 'name' | 'onChange'> {
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
}
export const InputPassword: React.FC<BaseInputPasswordProps> = ({
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
      <BaseInputPassword
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

export const BaseInputPassword: React.FC<BaseInputPasswordProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize,
  defaultValue,
  className,
  classNames,
  ...rest
}) => {
  const [, setState] = useControllableValue<InputPasswordValueType>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntInput.Password
        style={{ width: width }}
        className={groupClassNames('gt-input', className)}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        value={value}
        onChange={(e) => setState(e.target?.value)}
        classNames={{
          ...classNames,
          input: groupClassNames(undefined, classNames?.input)
        }}
        {...rest}
      />
    </Label>
  );
};
