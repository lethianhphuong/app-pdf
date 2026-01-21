import { SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export interface InfiniteSelectState {
  page: number;
  totalPages: number;
  options: DefaultOptionType[];
  value?: string;
  searchValue?: string;
}

export type InfiniteSelectAction =
  | {
      type: 'INIT' | 'FETCH_MORE' | 'GET_DETAIL' | 'RESET';
      payload: Pick<InfiniteSelectState, 'options'>;
    }
  | {
      type: 'FETCH';
      payload: Pick<InfiniteSelectState, 'totalPages'>;
    }
  | {
      type: 'SEARCH_VALUE';
      payload: Pick<InfiniteSelectState, 'searchValue' | 'options'>;
    };

export interface BaseInfiniteSelectProps extends SelectProps {
  listFn: (params?: any) => Promise<any>;
  detailFn?: (params?: any) => Promise<any>;
  config?: {
    labelField?: string;
    valueField?: string;
    source?: string;
    totalField?: string;
    labelDetailField?: string;
    valueDetailField?: string;
  };
  clearIconSize?: string | number;
}
