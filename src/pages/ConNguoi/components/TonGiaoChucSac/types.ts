import { FormInstance, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export interface SelectOption extends SelectProps {
  label?: string;
  name: string | number | (string | number)[];
  initialValue?: string;
  options?: DefaultOptionType[] | undefined;
}

export interface TonGiaoChucSacProps {
  form: FormInstance<any>;
  tonGiao: SelectOption;
  chucSac: SelectOption;
}
