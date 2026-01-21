import { SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export interface AntSearchInputProps extends SelectProps {
  style?: React.CSSProperties;
  searchFn: (params: { keySearch: string }) => Promise<any>;
  detailFn?: (param: { code: string }) => Promise<any>;
  config?: {
    source?: string;
    valueField?: string;
    labelField?: string;
    textField?: string;
    titleField?: string;
    additionalLabelField?: string[];
  };
  defaultValue?: string;
  defaultOptions?: DefaultOptionType[];
}
