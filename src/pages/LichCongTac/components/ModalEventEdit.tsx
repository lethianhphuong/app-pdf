import { useState } from 'react';
import { Form, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { convertScheduleEventToSuKien } from '../helper';
import { FormSuKien, ScheduleEvent } from '../types';
import FormEvent from './FormEvent';
import { Button } from '@/components/Atoms/Button';
import { Modal } from '@/components/Atoms/Modal';
import { useDrawerInner } from '@/hooks/common/useDrawer';
import { EventEmitter } from '@/hooks/common/useEventEmitter';
import { SuKienApi } from '@/service/API';

const ModalEventEdit: React.FC<{
  onSuccess: () => void;
  ref$: EventEmitter<Common.EmitEvent<{ data: ScheduleEvent }>>;
}> = ({ ref$, onSuccess }) => {
  const [form] = Form.useForm<FormSuKien>();
  const [loading, setLoading] = useState<boolean>(false);
  const [scheduleEvent, setScheduleEvent] = useState<ScheduleEvent>();

  const { visible, close } = useDrawerInner(ref$, (data) => {
    if (!data?.data) return;
    fetchEventDetail(data.data);
  });

  function fetchEventDetail(data: ScheduleEvent) {
    const event = convertScheduleEventToSuKien(data);
    form.setFieldsValue({
      diaDiem: event.diaDiem,
      ghiChu: event.ghiChu,
      idSuKien: event.idSuKien,
      danhMuc: { label: event.tenDanhMuc, value: event.idDanhMuc },
      ngayBatDau: event.ngayBatDau ? dayjs(event.ngayBatDau) : undefined,
      ngayKetThuc: event.ngayKetThuc ? dayjs(event.ngayKetThuc) : undefined,
      tenSuKien: event.tenSuKien
    });
    setScheduleEvent(data);
  }

  async function handleSubmit(formValues: FormSuKien) {
    if (!scheduleEvent?.Id) return;
    try {
      setLoading(true);
      await SuKienApi.chinhSuaSuKien(scheduleEvent?.Id, {
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

  async function deleteSuKien() {
    if (!scheduleEvent?.Id) return;
    try {
      setLoading(true);
      await SuKienApi.xoaSuKien(scheduleEvent?.Id);
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
    setScheduleEvent(undefined);
  }

  return (
    <Modal
      loading={loading}
      title='Sự kiện'
      okText='Lưu'
      open={visible}
      cancelText='Đóng'
      onOk={() => {
        form.submit();
      }}
      onCancel={close}
      afterClose={handleAfterClose}
      footer={[
        <Button key='back' onClick={close}>
          Đóng
        </Button>,
        <Button
          style={{ marginInlineStart: 0 }}
          key='submit'
          type='primary'
          loading={loading}
          onClick={() => {
            form.submit();
          }}
        >
          Lưu
        </Button>,
        <Popconfirm key={'delete'} title='Xác nhận xóa' description='Bạn có chắc muốn xoá?' onConfirm={deleteSuKien}>
          <Button style={{ marginInlineStart: 0 }} danger loading={loading}>
            Xóa sự kiện
          </Button>
        </Popconfirm>
      ]}
    >
      <Form form={form} onFinish={handleSubmit}>
        <FormEvent />
      </Form>
    </Modal>
  );
};

export default ModalEventEdit;
