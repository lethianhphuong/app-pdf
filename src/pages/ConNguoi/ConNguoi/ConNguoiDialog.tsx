import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ConNguoiProps } from '../types';
import FormConNguoi from './FormConNguoi';
import { ConvertConNguoiChiTiet } from './helper';
import { Modal } from '@/components/Atoms';
import { getChiTietConNguoi } from '@/service/API/con-nguoi';
import { ThongTinConNguoi } from '@/service/API/con-nguoi/types';

export default function ConNguoiDialog({ visible, close, idConNguoi, typeView }: ConNguoiProps) {
  const [form] = useForm<ThongTinConNguoi>();
  const [dataConNguoi, setDataConNguoi] = useState<ThongTinConNguoi>();

  useEffect(() => {
    if (idConNguoi) {
      onGetDetail(idConNguoi);
    }
  }, []);

  async function onGetDetail(id: string) {
    const res = await getChiTietConNguoi(id);

    setDataConNguoi(res?.data);

    const mapDataDetail = ConvertConNguoiChiTiet(res?.data);

    form.setFieldsValue(mapDataDetail);

    console.log(res?.data, 'res CON NGUOI');
  }

  const handleSubmit = function (data: ThongTinConNguoi) {
    console.log(data, 'data');
  };

  const handleClose = useCallback(() => {
    close();
  }, []);

  return (
    <Modal
      title={idConNguoi ? `Chi tiết con người ${dataConNguoi?.conNguoi?.hoTen}` : 'Thêm mới con người'}
      width='85%'
      styles={{
        body: {
          maxHeight: '75vh'
        }
      }}
      open={visible}
      onCancel={() => handleClose()}
      footer={[
        <Button key='save' type='primary' onClick={() => form.submit()}>
          Lưu
        </Button>,
        <Button key='close' type='primary' danger onClick={() => handleClose()}>
          Đóng
        </Button>
      ].reverse()}
    >
      <FormConNguoi form={form} onFinish={handleSubmit} typeView={typeView} />
    </Modal>
  );
}
