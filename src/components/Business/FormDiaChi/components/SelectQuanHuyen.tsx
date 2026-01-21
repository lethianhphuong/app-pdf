import { useEffect, useRef, useState } from 'react';
import { Form, Input, Spin } from 'antd';
import Select, { DefaultOptionType } from 'antd/es/select';
import { getAdministrativeUnitTag, sortAdministratives } from '../helper';
import { BaseSelectDiaChiProps } from '../types';
import { BaseSelect, TextTooltip } from '@/components/Atoms';
import { DanhMucApi } from '@/service/API';

const SelectQuanHuyen: React.FC<BaseSelectDiaChiProps> = (props) => {
  const { formConfig, form, disabled, fetchWhenDropdownOpen = false, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<DefaultOptionType[]>(rest.options || []);
  const tinhThanhPho = Form.useWatch(formConfig.tinhThanhPho.name, form);
  const quanHuyen = Form.useWatch(formConfig.quanHuyen.name, form);
  const xaPhuong = Form.useWatch(formConfig.xaPhuong.name, form);
  const maTinhThanhPho = tinhThanhPho?.value;
  const [tmpValue, setTmpValue] = useState('');

  const stopFetchData = useRef<boolean>(false);
  // Nếu disbale vẫn fetch data để fix tra cứu dân cư không trả về tên quận, huyện
  // const needFetchData = !!maTinhThanhPho && !disabled;
  const needFetchData = !!maTinhThanhPho;
  const isFetchDataWhenTinhThanhPhoChanged = needFetchData && !fetchWhenDropdownOpen;
  const isFetchDataWhenDropdownOpen = needFetchData && fetchWhenDropdownOpen;

  function handleChange(value: Common.OptionWithKey<string>) {
    form.resetFields([formConfig.xaPhuong.name]);
    form.resetFields([formConfig.quanHuyen.name]);
    form.setFieldValue(formConfig.xaPhuong.name, value);
    return;
  }

  useEffect(() => {
    if (quanHuyen?.value) {
      setTmpValue(quanHuyen);
      return;
    }

    if (!quanHuyen?.value && xaPhuong?.value) {
      const xaPhuongObj = options.find((xaPhuongValue) => xaPhuongValue.value === xaPhuong.value);
      setTmpValue(xaPhuongObj || xaPhuong);
      return;
    }

    setTmpValue('');
  }, [quanHuyen, xaPhuong]);

  async function onTinhThanhPhoChange() {
    if (!maTinhThanhPho) return;
    try {
      setLoading(true);
      const res = await DanhMucApi.getDanhMucQuanHuyen(maTinhThanhPho);
      // const sortDanhmucThanhPho = useMemo(() => {
      //   return sortBy(danhmucThanhPho, (item) => {
      //     return (item as any).endDate === '2025-07-01' ? 1 : 0;
      //   });
      // }, [danhmucThanhPho]);
      const unsortedQuanHuyenXaMoi = sortAdministratives(res?.data?.list || []);

      const newOptions = unsortedQuanHuyenXaMoi.map((item: any) => ({
        label: item.name,
        value: item.code,
        data: item,
        fullLabel: (
          <>
            <b>{item.name} - </b>
            <i>{tinhThanhPho?.label}</i>
            {getAdministrativeUnitTag(item?.endDate)}
          </>
        )
      }));
      setOptions(newOptions);

      //Handle when has value but not label
      const quanHuyen = form.getFieldValue(formConfig.quanHuyen.name);
      if (newOptions.length > 0 && !quanHuyen?.label) {
        const newOption = newOptions.find((item) => item.value === quanHuyen?.value)?.label;
        form.setFieldValue(formConfig.quanHuyen.name, {
          value: quanHuyen?.value,
          label: newOption?.label
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    stopFetchData.current = false;
    isFetchDataWhenTinhThanhPhoChanged ? onTinhThanhPhoChange() : setOptions([]);
  }, [tinhThanhPho, disabled]);

  function handleDropdownVisibleChange() {
    if (isFetchDataWhenDropdownOpen && !stopFetchData.current) {
      onTinhThanhPhoChange();
      stopFetchData.current = true;
    }
  }

  return (
    <>
      <BaseSelect
        showSearch
        {...rest}
        disabled={disabled}
        labelInValue
        required={formConfig.quanHuyen.required}
        name={'tmpQuanHuyen'}
        // name={formConfig.quanHuyen.name}
        label='Xã/Phường/Thị Trấn (Quận/huyện cũ)'
        loading={loading}
        dropdownRender={(menu) => (
          <Spin size='small' spinning={loading}>
            {menu}
          </Spin>
        )}
        value={tmpValue}
        onChange={handleChange}
        onClear={() => {
          setTmpValue('');
          form.resetFields([formConfig.quanHuyen.name]);
          form.resetFields([formConfig.xaPhuong.name]);
        }}
        options={options}
        optionRender={(oriOption) => (
          <TextTooltip ellipsis={{ tooltip: { placement: 'rightTop', arrow: false } }}>
            {oriOption.data?.fullLabel || oriOption?.label}
          </TextTooltip>
        )}
        onDropdownVisibleChange={(open) => open && handleDropdownVisibleChange()}
      />
      <Form.Item hidden name={'districtHidden'}>
        <Input hidden />
      </Form.Item>
      <Form.Item hidden name={formConfig.quanHuyen.name}>
        <Select />
      </Form.Item>
    </>
  );
};

export default SelectQuanHuyen;
