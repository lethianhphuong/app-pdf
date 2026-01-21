import { SelectCanBoByDonViProps } from './types';

export const defaultDonViConfig: Omit<SelectCanBoByDonViProps['donViConfig'], 'type' | 'maDonVi'> = {
  required: false,
  label: 'Đơn vị',
  name: 'donVi',
  labelInValue: true,
  config: {
    labelField: 'fullName',
    source: 'data.list',
    valueField: 'code'
  },
  col: {
    span: 12
  }
};

export const defaultCanBoConfig: SelectCanBoByDonViProps['canBoConfig'] = {
  required: false,
  label: 'Cán bộ kiểm tra',
  name: 'accountCanBo',
  labelInValue: true,
  showSearch: true,
  fieldNames: { label: 'fullName', value: 'id', title: 'account' },
  optionLabelConfig: {
    firstRow: ['fullName', 'policeNumber'],
    secondRow: ['militaryName', 'organizationName']
  },
  filterCurrentUser: false,
  col: {
    span: 12
  }
};
