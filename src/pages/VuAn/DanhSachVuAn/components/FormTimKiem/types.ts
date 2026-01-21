import { ReactNode } from 'react';
import { FileTypeEnums } from '@/constants/business/enums';

export interface TaoMoiButtonProps {
  onOpenAdd?: () => void;
  textButtonAdd?: string;
}

export interface FormTimKiemProps<T extends object> extends TaoMoiButtonProps {
  children?: ReactNode;
  onSearch?: (value: FormTimKiemValues<T>) => void;
  showLoaiHoSoQuanLy?: boolean;
  showTrangThaiDuyet?: boolean;
  showLoaiBaoCaoThamMuu?: boolean;
  placeholder?: string;
  resetPageNumberOnChange?: boolean;
  onExport?: (type: FileTypeEnums) => void;
}

export type FormTimKiemValues<T extends object> = T & {
  tuKhoaTimKiem: string;
  page: number;
};

export type RefFormSearch = {
  updateSearchValues: (values: FormTimKiemValues<any>) => void;
};
