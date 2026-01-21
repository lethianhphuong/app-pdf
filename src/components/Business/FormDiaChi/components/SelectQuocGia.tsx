import { BaseSelectDiaChiProps } from '../types';
import { Select } from '@/components/Atoms';
import { VN_CODE } from '@/constants/business/enums';

const SelectQuocGia: React.FC<BaseSelectDiaChiProps> = (props) => {
  const { formConfig, form, ...rest } = props;

  function onQuocGiaChange(value: any) {
    form.resetFields(
      value?.value === VN_CODE
        ? [formConfig.chiTietDiaDiem.name]
        : [formConfig.xaPhuong.name, formConfig.quanHuyen.name, formConfig.tinhThanhPho.name]
    );
  }
  return (
    <Select
      showSearch
      {...rest}
      labelInValue
      name={formConfig.quocGia?.name}
      required={formConfig.quocGia?.required}
      options={formConfig.quocGia?.options || []}
      onChange={onQuocGiaChange}
      label='Quốc gia'
    />
  );
};

export default SelectQuocGia;
