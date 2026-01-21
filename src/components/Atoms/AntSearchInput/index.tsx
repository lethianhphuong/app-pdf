import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { cloneDeep, debounce, get } from 'lodash';
import { AntSearchInputProps } from './types';

export type { AntSearchInputProps };
const initConfig = {
  source: 'data.list',
  valueField: 'id',
  labelField: 'name',
  titleField: 'account'
};

export const AntSearchInput: React.FC<AntSearchInputProps> = ({
  style,
  searchFn,
  detailFn,
  defaultValue,
  config = {
    ...initConfig
  },
  defaultOptions,
  mode,
  ...rest
}) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [loading, setLoading] = useState(false);

  const { labelField: tmplabelField, source: tmpsource, valueField: tmpvalueField, titleField: tmptitleField } = config;

  const labelField = tmplabelField ?? initConfig.labelField;
  const source = tmpsource ?? initConfig.source;
  const valueField = tmpvalueField ?? initConfig.valueField;
  const titleField = tmptitleField ?? initConfig.titleField;

  useEffect(() => {
    if (!defaultValue) return;
    initDefaultOptions(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (!defaultOptions) return;
    setData(defaultOptions);
  }, [defaultOptions]);

  const fetch = async (value: string) => {
    try {
      setLoading(true);
      const res = await searchFn({ keySearch: value });

      setData(
        // ...(data || []),
        get(res, source).map((item: any) => ({
          value: item[valueField],
          text: item[labelField],
          title: item[titleField],
          fullData: cloneDeep(item)
        }))
      );
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  };

  const initDefaultOptions = async (code: string) => {
    if (!detailFn) return;
    try {
      setLoading(true);
      const res = await detailFn({ code: code });

      setData([{ value: res[valueField], text: res[labelField], fullData: res }]);
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((newValue: string) => {
    if (!newValue) return;
    // setData([]);
    fetch(newValue);
  }, 500);

  return (
    <Select
      showSearch
      notFoundContent={loading ? <Spin size='small' /> : 'Không có dữ liệu'}
      loading={loading}
      style={style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      onSearch={handleSearch}
      defaultValue={defaultValue}
      mode={mode}
      {...rest}
      filterOption={false} // i need you
      options={[
        ...(loading && data && data?.length > 0 ? [{ value: undefined, label: <Spin size='small' /> }] : []),
        ...(data?.map((item) => ({
          value: item.value,
          label: item.text,
          title: item.title,
          fullData: item.fullData
        })) ?? []),
        ...(loading ? [{ value: undefined, label: <Spin size='small' /> }] : [])
      ]}
    >
      {/* {(data || []).map((d) => (
        <Select.Option key={d.value} value={d.value} fullData={d}>
          {d.text}
        </Select.Option>
      ))}
      {loading && (
        <Select.Option>
          <Spin size='small' />
        </Select.Option>
      )} */}
    </Select>
  );
};
