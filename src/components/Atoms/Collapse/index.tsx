import React from 'react';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Collapse as AntCollapse, CollapseProps } from 'antd';
import classNames from 'classnames';
import './style.less';

export interface BaseCollaspeProps extends CollapseProps {
  expandIconSize?: number | string;
}

export const Collapse: React.FC<BaseCollaspeProps> = ({ expandIconSize = 18, className, ...props }) => {
  return (
    <AntCollapse
      className={classNames('gt-collapse', className)}
      size='small'
      expandIcon={({ isActive }) => {
        return isActive ? (
          <MinusSquareOutlined style={{ fontSize: expandIconSize }} />
        ) : (
          <PlusSquareOutlined style={{ fontSize: expandIconSize }} />
        );
      }}
      {...props}
    />
  );
};
