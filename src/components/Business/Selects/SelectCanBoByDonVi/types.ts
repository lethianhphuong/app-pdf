import { ColProps } from 'antd';
import { FieldNames } from 'rc-select/lib/Select';
import { InfiniteSelectDonViProps } from '../InfiniteSelectDonVi/types';
import { BaseSelectProps } from '@/components/Atoms';
import { UserBasic } from '@/service/API/user/types';

export interface SelectCanBoByDonViProps {
  maDonVi?: string;
  hasDonViComponent?: boolean | { disabledCanBoWhenDonViNoValue?: boolean };
  canBoConfig: CanBoConfigProp;
  donViConfig?: DonViConfigProp;
}

export interface SelectCanBoByDonViComponentProps
  extends Omit<SelectCanBoByDonViProps, 'maDonVi' | 'hasDonViComponent' | 'donViConfig'> {
  listFn: (maDonVi?: string) => Promise<CanBoOption[] | undefined>;
  disabledCanBoWhenDonViNoValue?: boolean;
  donViConfig: DonViConfigProp;
}

export interface SelectCanBoByMaDonViProps
  extends Omit<SelectCanBoByDonViProps, 'donViConfig' | 'hasDonViComponent' | 'disabledCanBoWhenDonViNoValue'> {
  listFn: (maDonVi?: string) => Promise<CanBoOption[] | undefined>;
}

export interface DonViConfigProp extends InfiniteSelectDonViProps {
  col?: ColProps;
}

interface CustomFieldNames extends FieldNames {
  title: string;
}

interface CanBoConfigProp extends Omit<BaseSelectProps, 'fieldNames'> {
  col?: ColProps;
  optionLabelConfig?: {
    firstRow: (keyof CanBoOption)[];
    secondRow: (keyof CanBoOption)[];
  };
  filterCurrentUser?: boolean;
  listFn?: (maDonVi?: string) => Promise<CanBoOption[] | undefined>;
  maDonVi?: string;
  fieldNames?: CustomFieldNames;
}

export interface CanBoOption extends Omit<UserBasic, 'name'> {
  fullName?: string;
}
