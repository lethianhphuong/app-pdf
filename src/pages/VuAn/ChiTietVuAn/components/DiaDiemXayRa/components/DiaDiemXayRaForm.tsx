import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { debounce } from 'lodash';
import { DiaDiemXayRaParams } from '../types';
import { Button, DatePicker, Input } from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';
import ComboDiaChi from '@/components/Business/ComboDiaChi';
import { pastDatePresets } from '@/constants';
import { disabledFutureDate, formatDate } from '@/utilities/date';

export default function DiaDiemXayRaForm({ onAdd }: { onAdd: Function }) {
  const [form] = Form.useForm<DiaDiemXayRaParams>();
  const [showHoacKhoang, setShowHoacKhoang] = useState<boolean>(false);

  function onSave() {
    const values = form.getFieldsValue();
    console.log('onSave', values);
    values.ngayXayRa = values.ngayXayRa ? formatDate(values.ngayXayRa) : '';

    onAdd(values);
  }

  function onChangeHoacKhoang(e: CheckboxChangeEvent) {
    const checked = e?.target?.checked;
    setShowHoacKhoang(checked);
  }

  return (
    <>
      <Form form={form} onFinish={debounce(onSave, 500)}>
        <Row gutter={8} className='mt-2 gap-3'>
          <Col span={24}>
            <DatePicker
              presets={pastDatePresets}
              disabledDate={disabledFutureDate}
              label='Ngày xảy ra'
              name='ngayXayRa'
            />
          </Col>
          <Col span={24}>
            {!showHoacKhoang && <Input label='Giờ' name='gioXayRa' />}
            {showHoacKhoang && <Input label='Hoặc khoảng' name='xayRaKhoang' />}
          </Col>
          <Col span={24}>
            <Checkbox label='Hoặc khoảng' name='hoacKhoang' onChange={onChangeHoacKhoang} />
          </Col>

          <ComboDiaChi isDrawer={true} />
        </Row>
        <div className='flex justify-center items-center gap-2 mt-3'>
          <Button type='primary' onClick={onSave}>
            Thêm
          </Button>
        </div>
      </Form>
    </>
  );
}
