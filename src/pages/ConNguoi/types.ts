import { FormProps } from 'antd';
import { FormInstance } from 'antd/lib';
import { TypeViewCoNguoi } from '@/constants';
import { ThongTinConNguoi } from '@/service/API/con-nguoi/types';

export interface ConNguoiDiaLog {
  id?: string;
}

export interface ConNguoiProps {
  visible: boolean;
  close: () => void;
  idConNguoi?: string;
  typeView?: TypeViewCoNguoi;
}

export interface FormThongTinConNguoiProps extends Omit<FormProps, 'form'> {
  form: FormInstance;
  typeView?: TypeViewCoNguoi;
}

export interface dataConNguoiCV extends ThongTinConNguoi {}
