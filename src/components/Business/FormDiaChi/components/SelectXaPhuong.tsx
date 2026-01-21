import { useEffect, useRef, useState } from 'react';
import { Form, Spin } from 'antd';
import Select, { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import { transformOptionsXaPhuong } from '../helper';
import { BaseSelectDiaChiProps } from '../types';
import { BaseSelect, TextTooltip } from '@/components/Atoms';
import { DanhMucApi } from '@/service/API';

const SelectXaPhuong: React.FC<BaseSelectDiaChiProps> = (props) => {
  const { formConfig, form, disabled, fetchWhenDropdownOpen = false, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<DefaultOptionType[]>(rest.options || []);
  const quanHuyen = Form.useWatch(formConfig.quanHuyen.name, form);
  const xaPhuong = Form.useWatch(formConfig.xaPhuong.name, form);
  const maQuanHuyen = quanHuyen?.value;
  const filterProps = maQuanHuyen ? {} : { onSearch: debounce(onSearch, 500), filterOption: false };
  const [tmpValue, setTmpValue] = useState('');

  const stopFetchData = useRef<boolean>(false);
  // Nếu disbale vẫn fetch data để fix tra cứu dân cư không trả về tên xã, phường
  // const needFetchData = !!maQuanHuyen && !disabled;
  const needFetchData = !!maQuanHuyen;
  const isFetchDataWhenQuanHuyenChanged = needFetchData && !fetchWhenDropdownOpen;
  const isFetchDataWhenDropdownOpen = needFetchData && fetchWhenDropdownOpen;

  function handleChange(value: Common.OptionWithKey<string>, option: DefaultOptionType) {
    form.setFieldValue(formConfig.xaPhuong.name, value);
    if (!option?.others) return;
    if (!maQuanHuyen) {
      const { maQuanHuyen, maTinhThanhPho, tenTinhThanhPho, tenQuanHuyen } = option.others;
      form.setFieldValue(formConfig.tinhThanhPho.name, { value: maTinhThanhPho, label: tenTinhThanhPho });
      form.setFieldValue(formConfig.quanHuyen.name, { value: maQuanHuyen, label: tenQuanHuyen });
    }
  }

  useEffect(() => {
    if (quanHuyen?.value && xaPhuong?.value) {
      setTmpValue(xaPhuong);
      return;
    }

    setTmpValue('');
  }, [quanHuyen, xaPhuong]);

  async function onSearch(input: string) {
    try {
      setLoading(true);
      const res = await DanhMucApi.searchDanhMucDiaDiem(input);

      const newOptions = transformOptionsXaPhuong(
        res.data
          .filter((item) => !!item.district && !!item.province && !!item.village)
          .map((item) => ({
            value: item.village.code,
            label: item.village.name,
            others: {
              maQuanHuyen: item.district.code,
              tenQuanHuyen: item.district.name,
              maTinhThanhPho: item.province.code,
              tenTinhThanhPho: item.province.name,
              endDate: item.village.endDate
            }
          }))
      );
      setOptions(newOptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    stopFetchData.current = false;
    isFetchDataWhenQuanHuyenChanged ? onQuanHuyenChange() : setOptions([]);
  }, [quanHuyen, disabled]);

  async function handleDropdownVisibleChange() {
    if (isFetchDataWhenDropdownOpen && !stopFetchData.current) {
      onQuanHuyenChange();
      stopFetchData.current = true;
    }
  }

  async function onQuanHuyenChange() {
    try {
      setLoading(true);
      const res = await DanhMucApi.getDanhMucXaPhuong(maQuanHuyen);
      const tinhThanhPho = form.getFieldValue(formConfig.tinhThanhPho.name);
      const newOptions = transformOptionsXaPhuong(
        res.data.list.map((item) => ({
          label: item.name,
          value: item.code,
          others: {
            maQuanHuyen: quanHuyen?.value,
            tenQuanHuyen: quanHuyen?.label,
            maTinhThanhPho: tinhThanhPho?.value,
            tenTinhThanhPho: tinhThanhPho?.label,
            endDate: item.endDate
          }
        }))
      );
      setOptions(newOptions);

      //Handle when has value but not label
      const xaPhuong = form.getFieldValue(formConfig.xaPhuong.name);
      if (newOptions.length > 0 && !xaPhuong?.label) {
        const newLabel = newOptions.find((item) => item.value === xaPhuong?.value)?.label;
        form.setFieldValue(formConfig.xaPhuong.name, { value: xaPhuong?.value, label: newLabel });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BaseSelect
        showSearch
        {...rest}
        {...filterProps}
        disabled={disabled}
        labelInValue
        loading={loading}
        required={formConfig.xaPhuong.required}
        // name={formConfig.xaPhuong.name}
        name={'tmpXaPhuong'}
        label='Xã/phường cũ'
        dropdownRender={(menu) => (
          <Spin size='small' spinning={loading}>
            {menu}
          </Spin>
        )}
        value={tmpValue}
        onChange={handleChange}
        options={options}
        optionRender={(oriOption) => (
          <TextTooltip ellipsis={{ tooltip: { placement: 'rightTop', arrow: false } }}>
            {oriOption.data?.fullLabel || oriOption?.label}
          </TextTooltip>
        )}
        onDropdownVisibleChange={(open) => open && handleDropdownVisibleChange()}
      />
      <Form.Item hidden name={formConfig.xaPhuong.name}>
        <Select />
      </Form.Item>
    </>
  );
};

export default SelectXaPhuong;
