import { ProColumns } from '@ant-design/pro-components';
import { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { SaveData } from '../../types';
import { AntSearchInputProps } from '@/components/Atoms';
import { DiaDiemSinhHoatEnums } from '@/constants/enums';

export type ValidationRule = (params?: string) => (fieldName: string, value: string) => string | null;

export type TextFieldConfig = {
  field: string;
  name: string;
  type: 'text';
  validation?: string[];
  initialValue?: string;
};

export type DropdownOption = {
  value: string | number;
  label: string;
  text: string;
  [x: string]: any;
};
export type DropdownConfig = {
  field: string;
  name: string;
  type: 'dropdown';
  multiSelect?: boolean;
  validation?: string[];
  initialValue?: DropdownOption;
  data: DropdownOption[];
  multiSelectText?: (value: DropdownOption[]) => string;
  updateOtherField?: (value: DropdownOption[] | DropdownOption) => Record<string, any>;
};

export interface SearchInputConfig extends Omit<DropdownConfig, 'type'> {
  type: 'searchInput';
  searchFn: ({ keySearch }: { keySearch: string }) => Promise<any>;
  fieldConfig: AntSearchInputProps['config'];
}

export type DatetimeConfig = {
  field: string;
  name: string;
  type: 'datetime';
  validation?: string[];
  format?: string;
  disabledDate?: (date: dayjs.Dayjs) => boolean;
  updateOtherField?: (value: { value: dayjs.Dayjs; type: DatePickerProps['picker'] }) => Record<string, any>;
  initialValue?: { value: string; type: DatePickerProps['picker'] };
};

export type DiaDiemSinhHoatConfig = {
  field: string;
  name: string;
  type: 'diaDiemSinhHoat';
  validation?: string[];
  updateOtherField?: (value: {
    type: DiaDiemSinhHoatEnums;
    value: { label: string; value: string };
  }) => Record<string, any>;
  initialValue?: { type: DiaDiemSinhHoatEnums; value: { label: string; value: string } };
};

// Cách dùng table: tạo sẵn bảng trong word với 2 hàng: header và 1 hàng trống; đánh bookmark tại ô đầu tiên hàng thứ 2
export type TableConfig<T> = {
  field: string;
  name: string;
  type: 'table';
  columns?: (saveFieldDisplayText: (field: Partial<T>) => void, deleteRecord: (record: T) => void) => ProColumns<T>[];
  validation?: string[];
  initialValue?: Record<string, string | number>[];
};

export type FormFieldConfig =
  | DropdownConfig
  | TextFieldConfig
  | DatetimeConfig
  | TableConfig<any>
  | SearchInputConfig
  | DiaDiemSinhHoatConfig;

export type DocumentEditorProps = {
  documentData: Record<string, any> | string;
  id?: string;
  initDataExport: Record<string, any>;
  currentUser: string;
  title?: string;
  fieldConfig?: FormFieldConfig[];
  shouldFirstSaveTaiLieuKhacSoanThao?: boolean;
  listToaDo?: string[];
  readOnly?: boolean;
  commentOnly?: boolean;
  onContentChange?: () => void;
  onSave: (saveData: SaveData) => any;
  collapse: boolean;
  enableTrackChanges: boolean;
  onResetBieuMau?: () => Promise<void>;
};

export interface SetDocumentParam {
  fieldName: string;
  value: any;
  afterSet?: () => void;
}
