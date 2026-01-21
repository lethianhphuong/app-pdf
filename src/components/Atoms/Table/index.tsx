import React from 'react';
import { Table as AntTable, TableProps } from 'antd';
import './index.less';
import { getTableSortIcon } from '@/utilities/table';
import { isUndefined } from '@/utilities/typeof';

export const renderTotal = (total: number) => <span style={{ fontSize: '13px' }}>Tổng số: {total}</span>;
export interface BaseTableProps extends TableProps {}

export const Table: React.FC<BaseTableProps> = ({ columns, ...props }) => {
  return (
    <>
      <AntTable
        className='gt-table'
        rowKey={(record) => record.id}
        size='small'
        bordered
        columns={columns?.map((item) => (isUndefined(item.sorter) ? item : { ...item, sortIcon: getTableSortIcon }))}
        {...props}
      />
    </>
  );
};
