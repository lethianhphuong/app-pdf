import { useState } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { FormSuKien } from '../types';
import FormEvent from './FormEvent';
import { Modal } from '@/components/Atoms/Modal';
import { useDrawerInner } from '@/hooks/common/useDrawer';
import { EventEmitter } from '@/hooks/common/useEventEmitter';
import { SuKienApi } from '@/service/API';

const ModalEventAdd: React.FC<{
  onSuccess: () => void;
  ref$: EventEmitter<Common.EmitEvent<{ startTime: string; endTime: string; isAllDay: boolean }>>;
}> = ({ ref$, onSuccess }) => {
  const [form] = Form.useForm<FormSuKien>();
  const [loading, setLoading] = useState<boolean>(false);

  const { visible, close } = useDrawerInner(ref$, (data) => {
    if (!data?.startTime || !data?.endTime) return;
    if (!data.isAllDay) {
      form.setFieldsValue({
        ngayBatDau: dayjs(data.startTime),
        ngayKetThuc: dayjs(data.endTime)
      });
      return;
    }
    form.setFieldsValue({
      ngayBatDau: dayjs(data.startTime).add(7, 'hour'),
      ngayKetThuc: dayjs(data.startTime).add(18, 'hour')
    });
  });

  async function handleSubmit(formValues: FormSuKien) {
    try {
      setLoading(true);
      await SuKienApi.themSuKien({
        ngayBatDau: dayjs(formValues.ngayBatDau).toISOString(),
        ngayKetThuc: dayjs(formValues.ngayKetThuc).toISOString(),
        tenSuKien: formValues.tenSuKien,
        diaDiem: formValues.diaDiem,
        ghiChu: formValues.ghiChu,
        idDanhMuc: formValues.danhMuc.value,
        tenDanhMuc: formValues.danhMuc.label
      });
      await onSuccess();
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleAfterClose() {
    form.resetFields();
  }

  return (
    <Modal
      loading={loading}
      open={visible}
      title='Sự kiện mới'
      okText='Lưu'
      cancelText='Đóng'
      onOk={() => {
        form.submit();
      }}
      onCancel={close}
      afterClose={handleAfterClose}
    >
      <Form form={form} onFinish={handleSubmit}>
        <FormEvent />
      </Form>
    </Modal>
  );
};

export default ModalEventAdd;
