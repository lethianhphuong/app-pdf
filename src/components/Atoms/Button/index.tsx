import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import './index.less';

export interface BaseButtonProps extends ButtonProps {}

export const Button: React.FC<BaseButtonProps> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};
