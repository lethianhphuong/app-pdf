import { ProColumns } from '@ant-design/pro-components';
import { TableConfig } from '../../types';

export interface PopupEditableProps<T> {
  config: TableConfig<T>;
  currentValues: T[];
  onOk: (dataSource: T[], config: TableConfig<T>) => void;
  genarateColumns?: (saveFieldDisplayText: (field: T) => void, deleteRecord: (record: T) => void) => ProColumns<T>[];
}
