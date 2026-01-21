import { FormInstance } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { DefaultOptionType } from 'antd/es/select';
import { BaseInputProps, BaseSelectProps } from '@/components/Atoms';
import { DiaDiemEnums } from '@/constants/business/enums';

export type FieldName = NamePath | NamePath[];

interface FieldConfig {
  name: FieldName;
  required?: boolean;
}

interface FieldConfigWithOptions extends FieldConfig {
  options: DefaultOptionType[];
}

export interface ParentFormConfig {
  chiTietDiaDiem?: FieldName;
  xaPhuong: FieldName;
  quanHuyen: FieldName;
  tinhThanhPho: FieldName;
  quocGia?: FieldName;
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
  [DiaDiemEnums.XaPhuong]: FieldConfigWithOptions;
  [DiaDiemEnums.QuanHuyen]: FieldConfigWithOptions;
  [DiaDiemEnums.TinhThanhPho]: FieldConfigWithOptions;
  [DiaDiemEnums.QuocGia]?: FieldConfigWithOptions;
}

export interface FormDiaChiProps {
  title?: string | React.ReactElement;
  fieldsName?: ParentFormNameConfig;
  fieldsRequired?: DiaDiemEnums[];
  prefixName?: string;
  isShowChiTiet?: boolean;
  isShowXaHuyenTinh?: boolean;
  labelInValue?: boolean;
  disabled?: boolean;
  fetchWhenDropdownOpen?: boolean;
}

export interface FormDiaChiWithoutQGProps
  extends Pick<FormDiaChiProps, 'fetchWhenDropdownOpen' | 'isShowChiTiet' | 'disabled'> {
  formConfig: ChildFormConfig;
}

export interface FormDiaChiWithQGProps extends FormDiaChiWithoutQGProps {
  isShowXaHuyenTinh?: boolean;
}

export interface BaseSelectDiaChiProps
  extends Omit<BaseSelectProps, 'name' | 'label' | 'required' | 'onChange'>,
    Pick<FormDiaChiProps, 'fetchWhenDropdownOpen'> {
  formConfig: ChildFormConfig;
  form: FormInstance;
}

export interface InputChiTietDiaDiemProps extends Omit<BaseInputProps, 'name' | 'label' | 'required'> {
  formConfig: ChildFormConfig;
}
