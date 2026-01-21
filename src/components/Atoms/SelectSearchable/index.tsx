import React, { useState } from 'react';
import { Select } from 'antd';
import { getData } from '@/service';

interface Props {
  multiple: boolean;
  placeholder: string;
  apiUrl: string;
  fieldName: string;
  fieldValue: string;
  resData: string;
}

interface OptionData {
  value: string | number;
  label: string;
}

const MultipleAutoComplete: React.FC<Props> = (props) => {
  const { apiUrl, fieldName = 'label', fieldValue = 'value', multiple, resData } = props;
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionData[]>([
    {
      value: 1,
      label: '123'
    },
    {
      value: 2,
      label: '123222'
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchOptions = async (inputText: string) => {
    try {
      setLoading(true);
      // Gửi yêu cầu API để lấy data
      const response = await getData(`${apiUrl}?search=${inputText}`);
      const data = response[resData];
      setOptions(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
      setLoading(false);
    }
  };

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <Select
      mode={multiple ? 'multiple' : 'tags'}
      style={{ width: '100%' }}
      placeholder='Chọn nhiều mục'
      onChange={handleChange}
      value={value}
      onSearch={fetchOptions}
      options={options.map((item) => ({
        value: (item as any)[fieldValue],
        label: (item as any)[fieldName]
      }))}
      loading={loading}
    >
      {/* {options.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))} */}
    </Select>
  );
};

export default MultipleAutoComplete;
