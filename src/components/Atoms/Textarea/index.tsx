import { Input as AntInput, Form, FormItemProps } from 'antd';
import { Rule } from 'antd/es/form';
import { TextAreaProps } from 'antd/es/input';
import Label from '../Label';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface BaseTextareaProps extends Omit<TextAreaProps, 'onChange' | 'name'> {
  width?: number | string;
  label: string;
  name: string | string[];
  required?: boolean;
  rules?: Rule[];
  onChange?: (value: string) => void;
  autoTrim?: boolean;
  validateFirst?: boolean | 'parallel';
  restField?: FormItemProps;
}
export const Textarea: React.FC<BaseTextareaProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  rules,
  validateFirst = true,
  restField,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={generateRequiredRules(required, rules)}
      className='m-0'
      validateFirst={validateFirst}
      {...restField}
    >
      <BaseTextarea style={{ width: width }} name={name} label={label} required={required} {...rest} />
    </Form.Item>
  );
};

export const BaseTextarea: React.FC<BaseTextareaProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  defaultValue,
  onBlur,
  autoTrim = true,
  ...rest
}) => {
  const [, setState] = useControllableValue<TextAreaProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  // const hasValue = !!value;
  const hasValue = true;

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntInput.TextArea
        style={{ width: width }}
        className='gt-input'
        rows={5}
        value={value}
        onChange={(e) => setState(e.target?.value)}
        onBlur={(e) => {
          onBlur && onBlur(e);
          autoTrim && e.target?.value?.trim() !== e.target?.value && setState(e.target?.value?.trim());
        }}
        {...rest}
      />
    </Label>
  );
};
