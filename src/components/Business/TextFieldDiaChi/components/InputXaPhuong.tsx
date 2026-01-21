import { useEffect, useState } from 'react';
import { Form } from 'antd';
import Input from 'antd/es/input/Input';
import { BaseInputDiaChiProps } from '../types';
import { BaseInput } from '@/components/Atoms';

const InputXaPhuong: React.FC<BaseInputDiaChiProps> = (props) => {
  const { formConfig, ...rest } = props;
  const [tmpValue, setTmpValue] = useState('');
  const form = Form.useFormInstance();
  const quanHuyen = Form.useWatch(formConfig.quanHuyen.name, form);
  const xaPhuong = Form.useWatch(formConfig.xaPhuong.name, form);

  useEffect(() => {
    if (quanHuyen && xaPhuong) {
      setTmpValue(xaPhuong);
      return;
    }

    setTmpValue('');
  }, [quanHuyen, xaPhuong]);
  return (
    <>
      <BaseInput
        {...rest}
        value={tmpValue}
        required={formConfig.xaPhuong.required}
        name={'tmpXaPhuong'}
        label='Xã/phường'
      />
      <Form.Item name={formConfig.xaPhuong.name} required={formConfig.xaPhuong.required} hidden>
        <Input />
      </Form.Item>
    </>
  );
};

export default InputXaPhuong;
