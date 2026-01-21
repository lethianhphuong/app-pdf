import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import { Button, Select } from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';

/**
 * Ghi chú
 * Nếu logic dài thì tách /hooks và /utils
 * Nếu JSX dài thì tách /components
 *
 */

interface Props {
  id: string;
}

export default function Sample({ id }: Props) {
  //#region STATE & REFS

  //#endregion

  //#region CONSTANTS & DERIVED VALUES

  //#endregion

  //#region HOOKS

  //#endregion

  //#region HANDLERS

  //#endregion

  //#region UTILITY FUNCTIONS

  //#endregion

  //-------------------------------------------------

  //#region STATE & REFS
  const [form] = Form.useForm<string>();
  const [data, setData] = useState<string>('');
  //#endregion

  //#region CONSTANTS & DERIVED VALUES
  const isValid = data.length > 3;
  //#endregion

  //#region HOOKS (useEffect, useMemo, useCallback, ...)
  useEffect(() => {
    console.log('Mounted or data changed:', id, onFormatValue(data));

    if (isValid) {
      onChange();
    }
    onSave();
  }, []);
  //#endregion

  //#region HANDLERS (sự kiện: onChange, onSubmit, ...)
  function onChange() {
    console.log('onChange');
  }

  function onChangeNguonLap(value: string, option: BaseOptionType | BaseOptionType[]) {
    console.log('onChangeNguonLap', value, option);
  }

  function onSubmit() {
    console.log('onSubmit');
    setData('data');
  }

  function onSave() {
    console.log('onSave');
    form.submit();
  }
  //#endregion

  //#region UTILITY FUNCTIONS (logic phụ) (nếu dùng 2 chỗ khác nhau thì viết vào common)
  function onFormatValue(v: string) {
    return v?.trim().toUpperCase();
  }
  //#endregion

  return (
    <>
      <Form form={form} onFinish={debounce(onSubmit, 500)}>
        <Row gutter={8} className='mt-2 gap-1'>
          <Col span={24}>
            <Checkbox label='Sample check' name='sampleCheck' onChange={onChange} />
          </Col>
          <Col span={24}>
            <Select label='Nguồn lập' name='maNguonLap' required onChange={onChangeNguonLap} />
          </Col>
        </Row>
        <div className='flex justify-center items-center gap-2 mt-1'>
          <Button type='primary' onClick={onSave}>
            Thêm
          </Button>
        </div>
      </Form>
    </>
  );
}
