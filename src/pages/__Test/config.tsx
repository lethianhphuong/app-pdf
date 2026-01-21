import type { TableColumnsType } from 'antd';

export interface DataType {
  id: string;
  title: string;
  body: string;
}

export const columns: TableColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text: string) => <a>{text}</a>,
    width: '30%'
  },
  {
    title: 'Body',
    dataIndex: 'body'
  }
];
