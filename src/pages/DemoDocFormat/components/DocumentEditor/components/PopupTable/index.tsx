import { useEffect, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { nanoid } from 'nanoid';
import { PopupEditableProps } from './types';

function getDataSourceByLoopFilter<T extends Record<string, any>>(data: T[], id: string): T[] {
  return data
    .map((item: T) => {
      if (item.id === id) return null;
      if (!item.children) return item;

      const newChildren = getDataSourceByLoopFilter(item.children, id);

      return {
        ...item,
        children: newChildren.length > 0 ? newChildren : undefined
      };
    })
    .filter(Boolean) as T[];
}

export default function PopupTable<T extends Record<string, any>>({
  config,
  currentValues,
  onOk,
  genarateColumns
}: PopupEditableProps<T>) {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setDataSource(currentValues);
    setEditableRowKeys(currentValues?.map((item) => item.id));
  }, [currentValues]);

  const removeRow = (record: T) => {
    const newDataSource = getDataSourceByLoopFilter(dataSource, record.id);

    setDataSource(newDataSource);
  };

  const updateDataDisplay = (currentdataDisplayItem: T) => {
    const currentRecord = dataSource.find((item) => item.id === currentdataDisplayItem.id);
    const remainRecords = dataSource.filter((item) => item.id !== currentdataDisplayItem.id);
    if (!currentRecord) {
      setDataSource((prev) => [...prev, currentdataDisplayItem]);
    } else {
      setDataSource([...remainRecords, { ...currentRecord, ...currentdataDisplayItem }]);
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      onOk={() => {
        onOk(dataSource, config);
        setIsVisible(false);
      }}
      width={'100%'}
    >
      <EditableProTable<T>
        rowKey='id'
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => {
            return { id: nanoid(12) } as any;
          }
        }}
        columns={genarateColumns ? genarateColumns(updateDataDisplay, removeRow) : []}
        scroll={{
          x: '100%'
        }}
        value={dataSource}
        onChange={setDataSource as any}
        editable={{
          type: 'multiple',
          editableKeys,
          // onValuesChange(_record, dataSource) {
          //   setDataSource(dataSource);
          // },
          onChange: setEditableRowKeys
        }}
      />
    </Modal>
  );
}
