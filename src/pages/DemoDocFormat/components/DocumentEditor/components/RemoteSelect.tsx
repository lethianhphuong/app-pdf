import { useState } from 'react';
import { Select, SelectProps, Spin } from 'antd';
import { get } from 'lodash';
import { useAsyncEffect } from '@/hooks';

export interface RemoteSelectProps extends SelectProps {
  listingFn: () => Promise<any>;
  config?: {
    sourceField?: string;
    labelField?: string;
    valueField?: string;
  };
}

export default function RemoteSelect({
  listingFn,
  config = { sourceField: 'list', labelField: 'name', valueField: 'id' },
  ...rest
}: RemoteSelectProps) {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const { sourceField, labelField, valueField } = config;
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    setLoading(true);
    const res = await listingFn();
    setLoading(false);
    const dataList = get(res, sourceField ?? 'list');

    setOptions(
      dataList.map((item: Record<string, any>) => ({
        label: item[labelField ?? 'name'],
        value: item[valueField ?? 'id']
      }))
    );
  }, []);

  return (
    <Select
      {...rest}
      loading={loading}
      options={[...(options ?? []), ...(loading ? [{ label: <Spin />, value: undefined }] : [])]}
    />
  );
}
