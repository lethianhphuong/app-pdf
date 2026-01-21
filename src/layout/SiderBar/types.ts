import { ComponentClass, FunctionComponent } from 'react';
import { EventEmitter } from '@/hooks/common/useEventEmitter';

export interface SideBarProps {
  mainMenu: MenuItem[];
  bottomMenu: MenuItem[];
}

export interface SideBarRef {
  updateCollapse: (newState: boolean) => void;
}

export interface MenuItem {
  key: string;
  label: string;
  code?: string;
  children?: MenuItem[];
  icon?: JSX.Element;
  selectable?: boolean;
  component?: string | FunctionComponent<{}> | ComponentClass<{}, any>;
}

export interface ModalLichSuCapNhatProps {
  ref$: EventEmitter<Common.EmitEvent<undefined>>;
}
export interface ChiTietLichSuCapNhat {
  id: string;
  ngayCapNhat?: string;
  maChucNang?: string;
  tenChucNang?: string;
  noiDung?: string;
  maLoaiNguoiDung?: string;
  tenLoaiNguoiDung?: string;
  maMucHDSD?: string;
  tenMucHDSD?: string;
}
