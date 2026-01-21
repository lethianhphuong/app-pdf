import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { TonGiaoChucSacProps } from './types';
import { Select } from '@/components/Atoms';
import { DanhMucEnums } from '@/constants/business/enums';
import { useAsyncEffect, useDanhMuc } from '@/hooks';

const TonGiaoChucSac: React.FC<TonGiaoChucSacProps> = (props) => {
  const { form, tonGiao, chucSac } = props;

  const [danhMucTonGiao] = useDanhMuc([DanhMucEnums.TonGiao]);

  const [disabledChucSac, setDisabledChucSac] = useState<boolean>(true);
  const [chucSacOptions, setChucSacOptions] = useState<BaseOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const maTonGiao = Form.useWatch(['conNguoi', 'maTonGiao', 'value'], form);

  useAsyncEffect(async () => {
    setDisabledChucSac(true);
    if (maTonGiao && maTonGiao !== '000') {
      setLoading(true);
      try {
        // const res = await DanhMucApi.getDanhMucChucSac(maTonGiao);
        // if (res && res?.messageCode === '200' && res?.data && res.data?.list && res.data.list.length > 0) {
        //   setChucSacOptions(res.data.list.map((item) => ({ label: item.name, value: item.code })));
        // } else {
        //   setChucSacOptions([]);
        // }
        setChucSacOptions([]);
        setDisabledChucSac(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setChucSacOptions([]);
    }
  }, [maTonGiao]);

  return (
    <>
      <Row gutter={8}>
        <Col span={12}>
          <Select
            label={tonGiao?.label ? tonGiao.label : 'Tôn giáo'}
            name={tonGiao.name}
            showSearch
            labelInValue
            options={danhMucTonGiao.map((item) => ({ label: item.name, value: item.code }))}
            onChange={() => {
              form.resetFields([chucSac.name]);
            }}
          />
        </Col>
        <Col span={12}>
          <Select
            label={chucSac?.label ? chucSac.label : 'Chức sắc'}
            name={chucSac.name}
            showSearch
            labelInValue
            disabled={disabledChucSac}
            options={chucSacOptions}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default TonGiaoChucSac;
