import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { TableAction } from '@/components/Atoms';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    // render(value, record, index) {
    render() {
      return (
        <TableAction
          onDelete={() => alert('delete')}
          onDownload={() => alert('download')}
          onEdit={() => alert('edit')}
          onViewDetail={() => alert('view detail')}
        />
      );
    }
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  }
];

for (let i = 0; i <= 30; i++) {
  data.push({
    key: i + '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  });
}

const ActionTableDemo: React.FC<{ height: number }> = ({ height }) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        size='small'
        scroll={{ y: height - 100 }}
        pagination={{
          pageSize: 50
        }}
      />
    </div>
  );
};

export default ActionTableDemo;
