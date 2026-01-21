import { useEffect, useMemo, useRef } from 'react';
import {
  ColumnChooser,
  ColumnMenu,
  Filter,
  Freeze,
  GridComponent,
  Group,
  HeaderCellInfoEventArgs,
  Inject,
  LoadEventArgs,
  Page,
  Reorder,
  Resize,
  RowDD,
  RowDragEventArgs,
  Selection,
  Sort,
  Toolbar
} from '@syncfusion/ej2-react-grids';
import { Pagination } from 'antd';
import { transformToColumnsDirective } from './helper';
import './index.less';
import { ProTableAlignType, ProTableColumn, PropTableProps } from './types';
import { PAGE_SIZE } from '@/utilities/pagination';

export type { PropTableProps, ProTableAlignType, ProTableColumn };

const _rowDragDropNoIconConfig = (grid: Nullable<GridComponent>) => ({
  id: 'Grid',
  rowDropSettings: { targetID: 'Grid' },
  selectionSettings: {
    type: 'Single'
  },
  rowDrop: (args: RowDragEventArgs) => {
    args.cancel = true;
    if (!args.rows || !args.fromIndex || !args.dropIndex) return;

    const value: number[] = [];

    args.rows.forEach((_, index) => {
      value.push(args.fromIndex! + index);
    });

    grid?.reorderRows(value, args.dropIndex);
  }
});

/**
 * `ProTable` Custom Syncfusion Table, hỗ trợ local filter, sorting, drag drop, resizing.
 * `ProTable` biểu diễn danh sách dữ liệu hỗ trợ nhiều tiện ích.
 * ```tsx
 * <Container>
      <div className='flex flex-col h-full'>
        <div className='flex-1 overflow-auto'>
          <ProTable
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            onChange(page, size) {
              setParams((prevValue) => ({ ...prevValue, page, size }));
            }
            pagination={{
              current: params.page,
              pageSize: params.size,
              total: total,
            }}
          />
        </div>  
      </div>
    </Container>  
 * ```
 */
export function ProTable({ columns, dataSource, pagination, onChange, loading, ...rest }: PropTableProps) {
  const gridRef = useRef(null);
  const gridContainer = gridRef.current as Nullable<GridComponent>;
  const proTableColumns = columns && transformToColumnsDirective(columns);

  useEffect(() => {
    if (!gridContainer) return;
    gridContainer.changeDataSource(dataSource, proTableColumns);
  }, [dataSource]);

  useEffect(() => {
    if (!gridContainer) return;

    if (loading) {
      gridContainer.showSpinner();
      return;
    }

    gridContainer.hideSpinner();
  }, [loading]);

  const table = useMemo(() => {
    const handleGroupCaptionRender = () => {
      const captionTemplate = document.getElementsByClassName('e-groupcaption') as HTMLCollectionOf<HTMLDivElement>;
      const grid = gridRef?.current as Nullable<GridComponent>;
      for (let i = 0; i < captionTemplate.length; i++) {
        const element = captionTemplate[i];
        const content = element.innerText;

        const fieldDescription = content.split(':')?.[0]?.trim();
        const fieldCount = content.split('-')?.reverse()?.[0]?.trim();
        const fieldCode = content.split(':')?.[1]?.trim()?.split('-')?.[0]?.trim();
        let fieldName = fieldCode;
        const column = columns?.find((item) => item.title === fieldDescription) as ProTableColumn<any>;
        const groupColumn = grid?.groupModule?.groupSettings?.columns?.[0];
        if (column && column.customFilterOption && groupColumn) {
          const record = (grid?.dataSource as any[])?.find((item) => item[groupColumn] === fieldCode);
          fieldName = column.customFilterOption(fieldCode, record) || fieldCode;
        }
        element.innerText = `${fieldDescription}: ${fieldName} - ${fieldCount}`;
      }
    };

    return (
      <GridComponent
        ref={gridRef}
        delayUpdate
        allowSorting
        allowResizing
        allowFiltering
        showColumnMenu
        allowReordering
        allowGrouping
        allowRowDragAndDrop={false}
        dataBound={handleGroupCaptionRender}
        headerCellInfo={(args: HeaderCellInfoEventArgs) => {
          if (args?.cell?.column?.freeze !== 'None' && args.node) {
            (args.node as HTMLTableCellElement).style.backgroundColor = 'var(--gt-header-grid-bg-color)';
          }
        }}
        resizeSettings={{ mode: 'Auto' }}
        groupSettings={{
          showDropArea: false
        }}
        filterSettings={{ type: 'Menu' }}
        loadingIndicator={{ indicatorType: 'Shimmer' }}
        height={'100%'}
        gridLines='Both'
        columns={proTableColumns}
        load={(args: LoadEventArgs) => {
          // improve rendering performance by setting this value as false
          args.requireTemplateRef = false;
        }}
        emptyRecordTemplate={() => <></>}
        {...rest}
      >
        <Inject
          services={[
            Page,
            Sort,
            Filter,
            Group,
            Resize,
            Reorder,
            Freeze,
            ColumnChooser,
            Toolbar,
            ColumnMenu,
            RowDD,
            Selection
          ]}
        />
      </GridComponent>
    );
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <div className='gt-pro-table flex-1 flex flex-col' style={{ height: 'calc(100% - 37px)' }}>
        {table}
      </div>
      <div style={{ height: '37px' }} className='flex items-center justify-between px-2'>
        {pagination && (
          <>
            <div>Tổng số: {pagination.total}</div>
            <Pagination
              current={pagination.current}
              total={pagination.total}
              defaultPageSize={PAGE_SIZE}
              onChange={(page, pageSize) => {
                if (!gridContainer) return;
                onChange({
                  current: page,
                  pageSize: pageSize
                });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
