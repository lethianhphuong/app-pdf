import React from 'react';
import { InputNumber as AntInput, Form, FormItemProps, FormRule, InputNumberProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import groupClassNames from 'classnames';
import Label from '../Label';
import { REGEX_ALPHABET_CHARACTER_AND_SPECIAL_CHARACTER, REGEX_NUMBER_FORMAT, REGEX_NUMBER_PARSER } from '@/constants';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface BaseInputNumberProps extends Omit<InputNumberProps, 'name'> {
  width?: number | string;
  label: string;
  name: string | number | (string | number)[];
  required?: boolean;
  rules?: FormRule[];
  dependencies?: NamePath[];
  validateFirst?: boolean | 'parallel';
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  restField?: FormItemProps;
}
export const InputNumber: React.FC<BaseInputNumberProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  rules,
  dependencies,
  validateFirst = true,
  validateTrigger,
  validateDebounce,
  restField,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={generateRequiredRules(required, rules)}
      dependencies={dependencies}
      validateFirst={validateFirst}
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      {...restField}
      className={groupClassNames('m-0', restField?.className)}
    >
      <BaseInputNumber style={{ width: width }} name={name} label={label} required={required} {...rest} />
    </Form.Item>
  );
};

export const BaseInputNumber: React.FC<BaseInputNumberProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  defaultValue,
  onKeyDown,
  className,
  max = 999999999999999,
  maxLength,
  ...rest
}) => {
  const [, setState] = useControllableValue<InputNumberProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  const hasValue = true;
  const thousandSeperator = ',';

  function getMaxLengthAttribute(): number | undefined {
    if (maxLength) {
      const maxNumberByMaxLength = getMaxNumber();
      return maxNumberByMaxLength && getMaxLength(maxNumberByMaxLength);
    }
    if (max) {
      return getMaxLength(Number(max));
    }
    return undefined;
  }

  function getMaxLength(maxNumber: number): number {
    const maxNumberLength = maxNumber.toString().length;
    const numberOfDecimalSeparator = Math.floor((maxNumberLength - 1) / 3);
    return maxNumberLength + numberOfDecimalSeparator;
  }

  function getMaxNumberAttribute(): number | string | undefined {
    if (max) {
      return max;
    }
    if (maxLength) {
      return getMaxNumber();
    }
  }

  function getMaxNumber() {
    if (maxLength) {
      const numberOfDecimalSeparator = Math.floor((maxLength - 1) / 3);
      return 10 ** (maxLength - numberOfDecimalSeparator) - 1;
    }
  }

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntInput
        style={{ width: width }}
        className={groupClassNames('gt-input-number', className)}
        value={value}
        onChange={setState}
        decimalSeparator='.'
        formatter={(e) => `${e?.toString()}`.replace(REGEX_NUMBER_FORMAT, thousandSeperator)}
        parser={(e) => e?.replace(REGEX_NUMBER_PARSER, '') as unknown as number}
        maxLength={getMaxLengthAttribute()}
        max={getMaxNumberAttribute()}
        {...rest}
        onKeyDown={(event) => {
          onKeyDown && onKeyDown(event);
          const isPressingCtrlKey = event.ctrlKey;
          if (!isPressingCtrlKey && REGEX_ALPHABET_CHARACTER_AND_SPECIAL_CHARACTER.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
    </Label>
  );
};
