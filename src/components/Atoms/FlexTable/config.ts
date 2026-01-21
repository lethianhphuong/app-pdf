import { GetProp, TableProps } from 'antd';

export type ColumnsType<T> = TableProps<T>['columns'];

export type PaginationType = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export type FilterType = Parameters<GetProp<TableProps, 'onChange'>>[1];

export interface Table<T> {
  loading: boolean;
  dataSource: T;
  pagination: PaginationType;
}

export const tableDefault: Table<any[]> = {
  loading: true,
  dataSource: [],
  pagination: {
    pageSizeOptions: [25, 50, 100],
    current: 1,
    pageSize: 25,
    total: 0,
    showTotal: (total) => `Tổng số: ${total} (Bản ghi)`
  }
};
