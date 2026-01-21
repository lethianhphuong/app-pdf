import { ReactNode } from 'react';
import { FileTypeEnums } from '@/constants/business/enums';

export interface TaoMoiButtonProps {
  onOpenAdd?: () => void;
  textButtonAdd?: string;
}

export interface SearchBoxProps<T extends object> extends TaoMoiButtonProps {
  children?: ReactNode;
  onSearch?: (value: FormSearchBox<T>) => void;
  showLoaiHoSoQuanLy?: boolean;
  showTrangThaiDuyet?: boolean;
  showLoaiBaoCaoThamMuu?: boolean;
  placeholder?: string;
  resetPageNumberOnChange?: boolean;
  onExport?: (type: FileTypeEnums) => void;
}

export type FormSearchBox<T extends object> = T & {
  isQuanLyTrucTiep?: boolean;
  isChoXuLy?: boolean;
  tuKhoaTimKiem: string;
  page: number;
};

export type RefFormSearch = {
  updateSearchValues: (values: FormSearchBox<any>) => void;
};
