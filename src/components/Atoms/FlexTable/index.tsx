import React, { useMemo } from 'react';
import { Table as AntTable } from 'antd';
import classNames from 'classnames';
import './index.less';
import { TableProps, TableSortProps } from './type';
// import ElementLoader from '@/components/Business/ElementLoader';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/utilities/pagination';
import { getTableSort, getTableSortIcon } from '@/utilities/table';
import { isUndefined } from '@/utilities/typeof';

export type { TableProps, TableSortProps };

const renderTotal = (total: number) => <span style={{ fontSize: '13px' }}>Tổng số: {total}</span>;

/**
 * `FlexTable` Custom Antd Table, không hỗ trợ local filter, sorting, drag drop, resizing.
 * `FlexTable` biểu diễn danh sách dữ liệu đơn giản.
 * ```tsx
 * <Container>
      <div className='flex flex-col h-full'>
        <div className='flex-1 overflow-auto'>
          <FlexTable
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              current: params.page,
              pageSize: params.size,
              total: total,
              onChange(page, size) {
                setParams((prevValue) => ({ ...prevValue, page, size }));
              }
            }}
          />
        </div>  
      </div>
    </Container>  
 * ```
 */

export const FlexTable: React.FC<TableProps> = ({ className, onChange, columns, ...rest }) => {
  const currentColumns = useMemo(() => {
    return columns?.map((item) => {
      if (isUndefined(item.sorter)) {
        return item;
      }

      return { ...item, sortIcon: getTableSortIcon };
    });
  }, [columns]);

  return (
    <>
      {/* {loading && <ElementLoader />} */}
      <AntTable
        className={classNames('gt-flex-table h-full', className)}
        rowKey='id'
        size='small'
        bordered
        sticky
        scroll={{ y: 100 }}
        onChange={(pagination, filters, sorts, extra) => {
          const convertedSorts = getTableSort(sorts);
          onChange && onChange(pagination, filters, { origin: sorts, converted: convertedSorts }, extra);
        }}
        columns={currentColumns}
        {...rest}
        pagination={{
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          showSizeChanger: true,
          defaultPageSize: PAGE_SIZE,
          showTotal: renderTotal,
          ...rest?.pagination
        }}
      />
    </>
  );
};
