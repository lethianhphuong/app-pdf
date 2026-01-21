import { CaretDownOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Select as AntSelect, Form, SelectProps, Tooltip } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { FormItemProps } from 'antd/lib';
import classNames from 'classnames';
import { DisplayValueType } from 'rc-select/lib/BaseSelect';
import { EachElement } from '../EachElement';
import Label from '../Label';
import './index.less';
import { useControllableValue } from '@/hooks';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';
import { removeVietnameseAccents } from '@/utilities/string';

export interface BaseSelectProps extends SelectProps {
  width?: number | string;
  label: string;
  name: string | number | (string | number)[];
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  initialValue?: FormItemProps['initialValue'];
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  validateFirst?: boolean | 'parallel';
  dependencies?: NamePath[];
  restField?: FormItemProps;
}

export const Select: React.FC<BaseSelectProps> = ({
  width = '100%',
  label,
  name,
  required = false,
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
      className='m-0'
      initialValue={initialValue}
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      validateFirst={validateFirst}
      dependencies={dependencies}
      {...restField}
    >
      <BaseSelect style={{ width: width }} name={name} label={label} required={required} {...rest} />
    </Form.Item>
  );
};

export const BaseSelect: React.FC<BaseSelectProps> = ({
  value,
  onChange,
  required,
  label,
  name,
  width,
  clearIconSize = 18,
  defaultValue,
  onClear,
  className,
  ...rest
}) => {
  const [, setState] = useControllableValue<SelectProps['value']>(
    omitNil({ value, onChange }),
    omitNil({ defaultValue })
  );

  const filterOption = (input: string, option: any) =>
    removeVietnameseAccents(option?.label?.toString() ?? '')
      .toLowerCase()
      .includes(removeVietnameseAccents(input).toLowerCase());

  const isMultipleMode = rest.mode === 'multiple';
  const maxTagCount = isMultipleMode ? 'responsive' : undefined;

  // const hasValueInSingleMode = value && (rest.labelInValue ? value?.value : value);
  // const hasValueInMultipleMode = value && value.length > 0;
  // const hasValue = isMultipleMode ? hasValueInMultipleMode : hasValueInSingleMode;
  const hasValue = true;

  const suffixIcon = rest.loading ? (
    <LoadingOutlined style={{ fontSize: clearIconSize }} />
  ) : (
    <CaretDownOutlined
      aria-label='down'
      className='anticon-down ant-select-suffix'
      style={{ fontSize: clearIconSize }}
    />
  );

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

  return (
    <Label name={`${name}`} label={label} active={hasValue} required={required}>
      <AntSelect
        style={{ width: width }}
        className={classNames('gt-select', className)}
        optionFilterProp='label'
        filterOption={filterOption}
        allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: clearIconSize }} /> }}
        suffixIcon={suffixIcon}
        value={value}
        onChange={setState}
        onClear={onClear}
        maxTagCount={maxTagCount}
        maxTagPlaceholder={renderMaxTagPlaceholder}
        {...rest}
      />
    </Label>
  );
};
