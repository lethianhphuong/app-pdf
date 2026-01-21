import { GridModel } from '@syncfusion/ej2-react-grids';
import { ColumnModel } from '@syncfusion/ej2-react-grids';
import { ColumnGroupType, ColumnType, TableProps } from 'antd/lib/table';

export type PropTableProps = Pick<TableProps, 'columns' | 'dataSource' | 'pagination'> &
  Omit<GridModel, 'columns'> & {
    onChange: ({ current, pageSize }: { current: number; pageSize: number }) => void;
    loading?: boolean;
  };

export type ProTableAlignType = 'Left' | 'Right' | 'Center' | 'Justify';

export type FreezeDirection = 'Left' | 'Right' | 'Fixed' | 'None';

export type ProTableColumn<T> = (ColumnGroupType<T> | ColumnType<T>) & {
  customFilterOption?: (value: string, data: T & { column: ColumnModel; index: string }) => string;
  maxWidth?: string | number;
};

export type ProFilterOption = [
  any,
  {
    value: any;
    text: string;
  }
];
