import React, { ReactNode } from 'react';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';
import { generateRequiredRules } from '@/utilities/form/rules/common';

export interface BaseFormItemWrapperProps {
  width?: number | string;
  label: string;
  name: string;
  clearIconSize?: number | string;
  required?: boolean;
  rules?: Rule[];
  children: ReactNode;
}
export const FormItemWrapper: React.FC<BaseFormItemWrapperProps> = ({ name, required = false, rules, children }) => {
  return (
    <Form.Item name={name} rules={generateRequiredRules(required, rules)} className='m-0'>
      {children}
    </Form.Item>
  );
};
