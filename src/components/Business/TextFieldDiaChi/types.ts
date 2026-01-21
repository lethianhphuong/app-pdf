import { NamePath } from 'antd/es/form/interface';
import { BaseInputProps } from '@/components/Atoms';
import { DiaDiemEnums } from '@/constants/business/enums';

export type FieldName = NamePath | NamePath[];

interface FieldConfig {
  name: FieldName;
  required?: boolean;
}

export interface TextFieldDiaChiProps {
  title?: string | React.ReactElement;
  fieldsName?: ParentFormNameConfig;
  fieldsRequired?: DiaDiemEnums[];
  prefixName?: string;
  isShowChiTiet?: boolean;
  isShowXaHuyenTinh?: boolean;
  isVN?: boolean;
}

export interface ParentFormNameConfig {
  [DiaDiemEnums.ChiTietDiaDiem]: FieldName;
  [DiaDiemEnums.XaPhuong]: FieldName;
  [DiaDiemEnums.QuanHuyen]: FieldName;
  [DiaDiemEnums.TinhThanhPho]: FieldName;
  [DiaDiemEnums.QuocGia]?: FieldName;
}

export interface ChildFormConfig {
  [DiaDiemEnums.ChiTietDiaDiem]: FieldConfig;
  [DiaDiemEnums.XaPhuong]: FieldConfig;
  [DiaDiemEnums.QuanHuyen]: FieldConfig;
  [DiaDiemEnums.TinhThanhPho]: FieldConfig;
  [DiaDiemEnums.QuocGia]?: FieldConfig;
}

export interface FormDiaChiWithoutQGProps {
  formConfig: ChildFormConfig;
  isShowChiTiet?: boolean;
}

export interface FormDiaChiWithQGProps extends FormDiaChiWithoutQGProps {
  isShowXaHuyenTinh?: boolean;
  isVN: boolean;
}

export interface BaseInputDiaChiProps extends Omit<BaseInputProps, 'name' | 'label' | 'required' | 'form'> {
  formConfig: ChildFormConfig;
}

export interface InputChiTietDiaDiemProps extends Omit<BaseInputDiaChiProps, 'form'> {}
