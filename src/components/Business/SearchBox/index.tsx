import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CloseOutlined, DoubleRightOutlined, ReloadOutlined } from '@ant-design/icons';
import { Input as AntInput, Col, Form, Radio, Row } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { debounce } from 'lodash';
import './style.less';
import { FormSearchBox, RefFormSearch, SearchBoxProps, TaoMoiButtonProps } from './types';
import { Button } from '@/components/Atoms';
import { maxLengthConfig } from '@/constants/common/map';
import { ruleMaxLength, ruleNoSpecialCharacter } from '@/utilities/form/rules/common';

export type { FormSearchBox, RefFormSearch };

const TaoMoiButton: React.FC<TaoMoiButtonProps> = ({ onOpenAdd, textButtonAdd = 'Tạo yêu cầu' }) => (
  <Button type='primary' onClick={onOpenAdd}>
    {textButtonAdd}
  </Button>
);

const HoSoQuanLy = () => (
  <Form.Item name='isQuanLyTrucTiep' className='mb-0'>
    <Radio.Group
      className='flex xl:flex-row sm:flex-col'
      options={[
        { value: true, label: 'Hồ sơ trực tiếp quản lý' },
        { value: false, label: 'Hồ sơ phối hợp quản lý' }
      ]}
    />
  </Form.Item>
);

const TrangThaiXuLy = () => (
  <Form.Item name='isChoXuLy' className='mb-0'>
    <Radio.Group
      className='flex xl:flex-row sm:flex-col'
      options={[
        { value: true, label: 'Chờ xử lý' },
        { value: false, label: 'Đã xử lý' }
      ]}
    />
  </Form.Item>
);

const LoaiBaoCaoThamMuu = () => (
  <Form.Item name='isBaoCaoDi' className='mb-0'>
    <Radio.Group
      className='flex xl:flex-row sm:flex-col'
      options={[
        { value: true, label: 'Văn bản đi' },
        { value: false, label: 'Văn bản đến' }
      ]}
    />
  </Form.Item>
);

const SearchBoxComponent = <T extends object>(
  { children, ...props }: SearchBoxProps<T>,
  ref: React.ForwardedRef<RefFormSearch>
) => {
  const {
    onOpenAdd,
    onSearch,
    textButtonAdd,
    showLoaiHoSoQuanLy = false,
    showTrangThaiDuyet = false,
    showLoaiBaoCaoThamMuu = false,
    placeholder = 'Nhập từ khóa tìm kiếm',
    resetPageNumberOnChange = true
  } = props;
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [form] = Form.useForm<FormSearchBox<T>>();

  useImperativeHandle(ref, () => ({
    updateSearchValues: (values: { [x: string]: any }) => {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        ...values
      });
    }
  }));

  const handleSubmit = (formData: FormSearchBox<T>) => {
    if (onSearch) onSearch(resetPageNumberOnChange ? { ...formData, page: 1 } : formData);

    form.resetFields();
    form.setFieldsValue(formData);
  };

  const onRefresh = () => {
    form.resetFields();
    form.submit();
  };

  const onNguoiTaoOrTrangThaiDuyetChange = (changeFields: NamePath[]) => {
    const fieldChange: string[] = changeFields[0].name;
    if (
      fieldChange.includes('isQuanLyTrucTiep') ||
      fieldChange.includes('isChoXuLy') ||
      fieldChange.includes('isBaoCaoDi')
    ) {
      form.submit();
    }
  };

  return (
    <Form
      form={form}
      onFinish={debounce(handleSubmit, 500)}
      initialValues={{ isQuanLyTrucTiep: true, isChoXuLy: true, isBaoCaoDi: true }}
      onFieldsChange={onNguoiTaoOrTrangThaiDuyetChange}
    >
      {!showAdvancedSearch ? (
        <Row gutter={[8, 8]} justify='space-between' className='p-2 mb-1'>
          <Col className='flex items-center gap-2'>
            {onOpenAdd && <TaoMoiButton textButtonAdd={textButtonAdd} onOpenAdd={onOpenAdd} />}
          </Col>
          <Col className='text-center'>
            {showLoaiHoSoQuanLy && <HoSoQuanLy />}
            {showTrangThaiDuyet && <TrangThaiXuLy />}
            {showLoaiBaoCaoThamMuu && <LoaiBaoCaoThamMuu />}
          </Col>
          <Col className='flex items-center justify-end gap-2'>
            <Form.Item
              name='tuKhoaTimKiem'
              className='mb-0 text-end'
              rules={[ruleMaxLength(maxLengthConfig.lg), ruleNoSpecialCharacter]}
            >
              <AntInput.Search
                allowClear={{ clearIcon: <CloseOutlined style={{ fontSize: 18 }} /> }}
                placeholder={placeholder}
                style={{ minWidth: 300 }}
                onSearch={(e) => {
                  form.setFieldValue('tuKhoaTimKiem', e.trim());
                  form.submit();
                }}
                onBlur={(e) => {
                  form.setFieldValue('tuKhoaTimKiem', e.target.value.trim());
                }}
              />
            </Form.Item>
            <Button icon={<ReloadOutlined />} onClick={onRefresh} style={{ minWidth: 32 }} />
            {children && (
              <Button
                icon={<DoubleRightOutlined rotate={90} />}
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                style={{ minWidth: 32 }}
              />
            )}
          </Col>
        </Row>
      ) : (
        <div className='flex flex-col gap-2 p-2 pb-0'>
          {children}
          <div className='flex justify-center items-center gap-2'>
            {showLoaiHoSoQuanLy && <HoSoQuanLy />}
            {showTrangThaiDuyet && <TrangThaiXuLy />}
            {showLoaiBaoCaoThamMuu && <LoaiBaoCaoThamMuu />}
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
            {onOpenAdd && <TaoMoiButton textButtonAdd={textButtonAdd} onOpenAdd={onOpenAdd} />}
            <Button type='primary' onClick={onRefresh}>
              Làm mới
            </Button>
            <Button
              icon={<DoubleRightOutlined rotate={-90} />}
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            />
          </div>
        </div>
      )}
    </Form>
  );
};

const SearchBox = forwardRef(SearchBoxComponent) as <T extends object>(
  props: SearchBoxProps<T> & {
    ref?: React.ForwardedRef<RefFormSearch>;
  }
) => ReturnType<typeof SearchBoxComponent>;

export default SearchBox;
