import { useState } from 'react';
import { Button, Flex, Form, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  BaseDatePicker,
  BaseInput,
  BaseSelect,
  BaseTextarea,
  DatePicker,
  Input,
  Select,
  Textarea
} from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';

const FormDemo = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const [name, setName] = useState<string>('');
  const [ngaySinh, setNgaySinh] = useState<dayjs.Dayjs | null | undefined>();
  const [thanhPho, setThanhPho] = useState<string>('');
  const [diaChi, setDiaChi] = useState<string>('');
  return (
    <>
      <div>
        <Typography.Text strong>Use with form</Typography.Text>
      </div>

      <Form form={form} initialValues={{ name: 'Nguyen Van A' }}>
        <Space direction='vertical'>
          <Space direction='horizontal'>
            <Input label='Ho va ten' name='name' required={true} width={200} />
            <DatePicker label='Ngay sinh' name='ngaySinh' width={200} required={true} />
            <Select
              showSearch
              width={200}
              label='Thanh Pho'
              name='thanhPho'
              options={[
                { label: 'TP.Ha Noi', value: '01' },
                { label: 'TP.Ho Chi Minh', value: '02' }
              ]}
            />
            <Checkbox name={'gioiTinhNam'} label='Gioi tinh nam' />
          </Space>
          <Space direction='horizontal'>
            <Textarea label='Dia chi' name='diaChi' width={600} />
          </Space>
          <Button
            type='primary'
            onClick={() => {
              form.validateFields().then((values) => {
                setFormValues(values);
              });
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              form.setFieldsValue({
                name: 'Nguyen Van B',
                ngaySinh: dayjs(),
                thanhPho: '01',
                gioiTinhNam: true,
                diaChi: 'Ha Noi'
              });
            }}
          >
            update value
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            reset value
          </Button>
        </Space>
      </Form>
      <Typography.Text>form data: {JSON.stringify(formValues)}</Typography.Text>

      <div>
        <Typography.Text strong>Use without form</Typography.Text>
      </div>

      <Flex gap={16}>
        <BaseInput name={'name'} label='Họ và tên' value={name} onChange={(e) => setName(e)} />
        <BaseDatePicker name={'ngaySinh'} label='Ngày sinh' value={ngaySinh} onChange={(e) => setNgaySinh(e)} />
        <BaseSelect
          label='Thanh Pho'
          name='thanhPho'
          options={[
            { label: 'TP.Ha Noi', value: '01' },
            { label: 'TP.Ho Chi Minh', value: '02' }
          ]}
          value={thanhPho}
          onChange={setThanhPho}
        />
        <BaseTextarea label='Dia chi' name='diaChi' rows={1} value={diaChi} onChange={(e) => setDiaChi(e)} />
      </Flex>
      <Typography.Text>
        values: {`name: ${name}, ngaySinh: ${ngaySinh}, thanhPho: ${thanhPho}, diaChi: ${diaChi}`}{' '}
      </Typography.Text>
    </>
  );
};

export default FormDemo;
