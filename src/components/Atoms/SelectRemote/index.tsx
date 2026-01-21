import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { BaseSelect, BaseSelectProps } from '../Select';
import { generateRequiredRules } from '@/utilities/form/rules/common';
import { omitNil } from '@/utilities/object';

export interface SelectRemoteProps extends Omit<BaseSelectProps, 'options' | 'loading' | 'suffixIcon'> {
  validateDebounce?: number;
  validateTrigger?: string | string[] | false;
  fetchData: () => Promise<DefaultOptionType[] | undefined>;
}

export const SelectRemote: React.FC<SelectRemoteProps> = ({
  width = '100%',
  label,
  name,
  required = false,
  rules,
  initialValue,
  validateDebounce,
  validateTrigger,
  labelInValue,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={generateRequiredRules(required, rules)}
      className='m-0'
      initialValue={initialValue}
      validateDebounce={validateDebounce}
      validateTrigger={validateTrigger}
    >
      <BaseSelectRemote
        labelInValue={labelInValue}
        style={{ width: width }}
        name={name}
        label={label}
        required={required}
        {...rest}
      />
    </Form.Item>
  );
};

export const BaseSelectRemote: React.FC<SelectRemoteProps> = ({ clearIconSize = 18, fetchData, ...rest }) => {
  const [options, setOptions] = useState<DefaultOptionType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const otherSelectProps = omitNil({
    suffixIcon: loading ? <LoadingOutlined style={{ fontSize: clearIconSize }} /> : undefined,
    ...rest
  });

  async function fetchOptions() {
    try {
      setLoading(true);
      const list = await fetchData();
      setOptions(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOptions();
  }, []);

  return <BaseSelect loading={loading} options={options} {...otherSelectProps} />;
};
