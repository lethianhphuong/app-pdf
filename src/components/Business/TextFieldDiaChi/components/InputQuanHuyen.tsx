import { useEffect, useState } from 'react';
import { Form } from 'antd';
import Input from 'antd/es/input/Input';
import { BaseInputDiaChiProps } from '../types';
import { BaseInput } from '@/components/Atoms';

const InputQuanHuyen: React.FC<BaseInputDiaChiProps> = (props) => {
  const { formConfig, ...rest } = props;
  const [tmpValue, setTmpValue] = useState('');
  const form = Form.useFormInstance();
  const quanHuyen = Form.useWatch(formConfig.quanHuyen.name, form);
  const xaPhuong = Form.useWatch(formConfig.xaPhuong.name, form);

  useEffect(() => {
    if (quanHuyen) {
      setTmpValue(quanHuyen);
      return;
    }

    if (!quanHuyen && xaPhuong) {
      setTmpValue(xaPhuong);
      return;
    }

    setTmpValue('');
  }, [quanHuyen, xaPhuong]);

  return (
    <>
      <BaseInput
        {...rest}
        required={formConfig.quanHuyen.required}
        name={'tmpQuanHuyen'}
        value={tmpValue}
        label=' Quận/huyện'
      />
      <Form.Item name={formConfig.quanHuyen.name} required={formConfig.quanHuyen.required} hidden>
        <Input />
      </Form.Item>
    </>
  );
};

export default InputQuanHuyen;
