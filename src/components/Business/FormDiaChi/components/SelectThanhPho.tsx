import { BaseSelectDiaChiProps } from '../types';
import { Select, TextTooltip } from '@/components/Atoms';

const SelectTinhThanhPho: React.FC<BaseSelectDiaChiProps> = (props) => {
  const { formConfig, form, ...rest } = props;

  function onThanhPhoChange() {
    form.resetFields([formConfig.xaPhuong.name, formConfig.quanHuyen.name]);
  }
  return (
    <Select
      showSearch
      {...rest}
      labelInValue
      required={formConfig.tinhThanhPho.required}
      name={formConfig.tinhThanhPho.name}
      options={formConfig.tinhThanhPho.options || []}
      onChange={onThanhPhoChange}
      label='Tỉnh/thành phố (Tỉnh cũ)'
      optionRender={(oriOption) => (
        <TextTooltip ellipsis={{ tooltip: { placement: 'rightTop', arrow: false } }}>
          {oriOption.data?.fullLabel || oriOption?.label}
        </TextTooltip>
      )}
    />
  );
};

export default SelectTinhThanhPho;
