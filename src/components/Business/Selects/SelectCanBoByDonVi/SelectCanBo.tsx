import { useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { omit } from 'lodash';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { defaultCanBoConfig } from './config';
import { CanBoOption, SelectCanBoByDonViProps } from './types';
import { Select } from '@/components/Atoms';
import { removeVietnameseAccents } from '@/utilities/string';

function isAdminDonVi(fullName: string) {
  //check fullName có chứa số tự nhiên
  return /\d/.test(fullName);
}

export default function SelectCanBo(props: SelectCanBoByDonViProps['canBoConfig']) {
  const { listFn, maDonVi, fieldNames, ...rest } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<CanBoOption[]>([]);
  const optionLabelConfig = props.optionLabelConfig || defaultCanBoConfig.optionLabelConfig;

  async function fetchDanhSachCanBo(maDonVi?: string) {
    if (!listFn || !maDonVi) return;
    try {
      setLoading(true);
      const res = await listFn(maDonVi);
      if (!res) {
        setOptions([]);
        return;
      }
      setOptions(
        res
          ?.filter((item) => !isAdminDonVi(item.fullName || ''))
          ?.map((item) => ({ ...item, title: item[fieldNames?.title as keyof CanBoOption] }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDanhSachCanBo(maDonVi);
  }, [maDonVi]);

  function filterOption(input: string, option?: DefaultOptionType): boolean {
    return !!optionLabelConfig?.firstRow
      .concat(optionLabelConfig?.secondRow)
      .map((item) => option?.[item])
      .filter(Boolean)
      .some((item) =>
        removeVietnameseAccents(item)?.toLowerCase()?.includes(removeVietnameseAccents(input)?.toLowerCase())
      );
  }

  return (
    <Select
      labelInValue
      options={options}
      loading={loading}
      filterOption={filterOption}
      dropdownRender={(menu) => (
        <Spin size='small' spinning={loading}>
          {menu}
        </Spin>
      )}
      fieldNames={omit(fieldNames, ['title'])}
      optionRender={(oriOption) => {
        const firstRowArr = optionLabelConfig?.firstRow?.map((item) => oriOption.data?.[item])?.filter(Boolean);
        const secondRowArr = optionLabelConfig?.secondRow?.map((item) => oriOption.data?.[item])?.filter(Boolean);
        return (
          <Typography.Paragraph
            className='text-wrap'
            style={{ marginBottom: 0 }}
            ellipsis={{
              rows: 2,
              tooltip: { title: firstRowArr?.concat(secondRowArr)?.join(' - '), placement: 'right' }
            }}
          >
            <b>{firstRowArr?.join(' - ')}</b>
            <br />
            <i>{secondRowArr?.join(' - ')}</i>
          </Typography.Paragraph>
        );
      }}
      {...rest}
    />
  );
}
