import React from 'react';
import { Checkbox as AntCheckbox, CheckboxProps, Form } from 'antd';

interface Props extends Omit<CheckboxProps, 'name'> {
  name: string | number | (string | number)[];
  label: string;
  initialValue?: any;
}
const Checkbox: React.FC<Props> = ({ name, initialValue, label, ...props }) => {
  return (
    <Form.Item name={name} valuePropName='checked' className='m-0' initialValue={initialValue}>
      <AntCheckbox {...props}>{label}</AntCheckbox>
    </Form.Item>
  );
};

export default Checkbox;
