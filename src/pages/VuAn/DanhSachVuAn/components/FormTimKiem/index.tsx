import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CloseOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Input as AntInput, Col, Form, Row } from 'antd';
import { debounce } from 'lodash';
import FormAdvancedSearch from './components/FormAdvancedSearch';
import { FormTimKiemProps, FormTimKiemValues, RefFormSearch } from './types';
import { Button } from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';
import { maxLengthConfig } from '@/constants/common/map';
import { ruleMaxLength, ruleNoSpecialCharacter } from '@/utilities/form/rules/common';

export type { FormTimKiemValues, RefFormSearch };

const FormTimKiemComponent = <T extends object>(
  { ...props }: FormTimKiemProps<T>,
  ref: React.ForwardedRef<RefFormSearch>
) => {
  const { onSearch, placeholder = 'Nhập từ khóa tìm kiếm', resetPageNumberOnChange = true } = props;
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [form] = Form.useForm<FormTimKiemValues<T>>();

  useImperativeHandle(ref, () => ({
    updateSearchValues: (values: { [x: string]: any }) => {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        ...values
      });
    }
  }));

  const handleSubmit = (formData: FormTimKiemValues<T>) => {
    if (onSearch) onSearch(resetPageNumberOnChange ? { ...formData, page: 1 } : formData);

    form.resetFields();
    form.setFieldsValue(formData);
  };

  const onRefresh = () => {
    form.resetFields();
    form.submit();
  };

  return (
    <Form
      form={form}
      onFinish={debounce(handleSubmit, 500)}
      initialValues={{ isQuanLyTrucTiep: true, isChoXuLy: true, isBaoCaoDi: true }}
    >
      <Row gutter={[8, 8]} justify='center' className='pt-2 pl-2'>
        <Col>
          <div className='text-sm font-semibold text-red-500'>
            Những vụ trên danh sách được bôi vàng là vụ được điều chuyển đến chưa thực hiện phân công lại
          </div>
        </Col>
      </Row>
      {!showAdvancedSearch ? (
        <div className='flex flex-col'>
          <Row gutter={[8, 8]} justify='space-between' className='pt-2 pl-2'>
            <Col className='flex items-center gap-2'>
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
              <Checkbox
                className='gt-checkbox'
                label='Thụ lý chính được phân công trong vụ án'
                name='thuLyChinh'
                onChange={(_e) => {
                  form.submit();
                }}
              />
            </Col>
            <Col className='flex items-center gap-2 mr-1'>
              <Button
                icon={<DoubleRightOutlined rotate={90} />}
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                style={{ minWidth: 32 }}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className='flex flex-col gap-2 p-2 pb-0'>
          <FormAdvancedSearch />
          <div className='flex justify-center items-center gap-2'>
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
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

const FormTimKiem = forwardRef(FormTimKiemComponent) as <T extends object>(
  props: FormTimKiemProps<T> & {
    ref?: React.ForwardedRef<RefFormSearch>;
  }
) => ReturnType<typeof FormTimKiemComponent>;

export default FormTimKiem;
