import { useEffect, useRef, useState } from 'react';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import { Checkbox, CheckboxProps, Col, Divider, Form, Popconfirm, Row, Typography } from 'antd';
import { Button, Input, TextTooltip } from '@/components/Atoms';
import { Modal } from '@/components/Atoms/Modal';
import { SuKienApi } from '@/service/API';

export default function ScheduleFilter({ onChange }: { onChange: (values: string[]) => void }) {
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [danhSachLoaiSuKien, setDanhSachLoaiSuKien] = useState<Common.OptionWithKey<string>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formCreateLoaiSuKien] = Form.useForm();
  const [formUpdateLoaiSuKien] = Form.useForm();
  const [createLoaiSuKienLoading, setCreateLoaiSuKienLoading] = useState(false);
  const [updateLoaiSuKienLoading, setUpdateLoaiSuKienLoading] = useState(false);
  const selectedLoaiSuKienId = useRef<string>();

  const plainOptions = danhSachLoaiSuKien.map((item) => item.value);

  const checkAll = plainOptions.length === eventTypes.length;
  const indeterminate = eventTypes.length > 0 && eventTypes.length < plainOptions.length;

  useEffect(() => {
    getLoaiSuKien();
  }, []);

  useEffect(() => {
    onChange(eventTypes);
  }, [eventTypes]);

  const getLoaiSuKien = async () => {
    const res = await SuKienApi.getDanhSachLoaiSuKien();
    const options = res.data.map((item) => ({
      label: item.tenDanhMuc,
      value: item.id,
      maSuKien: item.maDanhMuc
    }));
    setDanhSachLoaiSuKien(options);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setEventTypes(e.target.checked ? plainOptions : []);
  };

  const handleLoaiSuKienCreate = async (formValues: { tenSuKien: string }) => {
    try {
      setCreateLoaiSuKienLoading(true);
      await SuKienApi.themLoaiSuKien({ tenSuKien: formValues.tenSuKien });
      await getLoaiSuKien();
      handleLoaiSuKienModalCancel();
    } catch (_) {
      //
    } finally {
      setCreateLoaiSuKienLoading(false);
    }
  };

  const handleLoaiSuKienUpdate = async (id: string, formValues: { tenSuKien: string }) => {
    try {
      setUpdateLoaiSuKienLoading(true);
      await SuKienApi.chinhSuaLoaiSuKien(id, { tenSuKien: formValues.tenSuKien });
      await getLoaiSuKien();
      handleEditSuKienCancel();
    } catch (_) {
      //
    } finally {
      setUpdateLoaiSuKienLoading(false);
    }
  };

  const handleLoaiSuKienDelete = async (id: string) => {
    try {
      setUpdateLoaiSuKienLoading(true);
      await SuKienApi.xoaLoaiSuKien(id);
      await getLoaiSuKien();
      handleEditSuKienCancel();
    } catch (_) {
      //
    } finally {
      setUpdateLoaiSuKienLoading(false);
    }
  };

  const handleLoaiSuKienModalCancel = () => {
    formCreateLoaiSuKien.resetFields();
    setIsModalOpen(false);
  };

  const handleEditSuKienCancel = () => {
    formUpdateLoaiSuKien.resetFields();
    selectedLoaiSuKienId.current = undefined;
    setIsEditOpen(false);
  };

  return (
    <>
      <div>
        <Typography.Text strong>Bộ lọc</Typography.Text>
      </div>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Tất cả
      </Checkbox>
      <Divider className='m-0 p-0' />
      <Checkbox.Group
        style={{ width: '100%' }}
        value={eventTypes}
        onChange={(checkedValues: string[]) => {
          setEventTypes(checkedValues);
        }}
      >
        <Row>
          {danhSachLoaiSuKien.map((item: any) => (
            <Col span={24} key={item.value} className='flex justify-between relative'>
              <Checkbox value={item.value} className='flex-1'>
                <TextTooltip style={{ maxWidth: '180px' }}>{item.label}</TextTooltip>
              </Checkbox>
              <span
                className='cursor-pointer absolute right-0'
                onClick={() => {
                  selectedLoaiSuKienId.current = item.value;
                  formUpdateLoaiSuKien.setFieldsValue({
                    tenSuKien: item.label
                  });
                  setIsEditOpen(true);
                }}
              >
                <EditFilled />
              </span>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
      <Divider className='m-0 p-0' />
      <div
        className='cursor-pointer'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Typography.Text>
          <PlusOutlined />
          &nbsp; Tạo loại khác
        </Typography.Text>
      </div>
      <Modal
        title='Loại sự kiện'
        loading={createLoaiSuKienLoading}
        open={isModalOpen}
        onOk={() => {
          formCreateLoaiSuKien.submit();
        }}
        onCancel={handleLoaiSuKienModalCancel}
      >
        <Form form={formCreateLoaiSuKien} onFinish={handleLoaiSuKienCreate}>
          <Input label='Tên loại sư kiện' name={'tenSuKien'} />
        </Form>
      </Modal>
      <Modal
        title='Loại sự kiện'
        loading={updateLoaiSuKienLoading}
        open={isEditOpen}
        onOk={() => {
          formUpdateLoaiSuKien.submit();
        }}
        onCancel={handleEditSuKienCancel}
        footer={[
          <Button key='back' onClick={handleEditSuKienCancel}>
            Đóng
          </Button>,
          <Button
            style={{ marginInlineStart: 0 }}
            key='submit'
            type='primary'
            loading={updateLoaiSuKienLoading}
            onClick={() => {
              formUpdateLoaiSuKien.submit();
            }}
          >
            Lưu
          </Button>,
          <Popconfirm
            key={'delete'}
            title='Xác nhận xóa'
            description='Bạn có chắc muốn xoá?'
            onConfirm={() => {
              if (!selectedLoaiSuKienId.current) return;
              handleLoaiSuKienDelete(selectedLoaiSuKienId.current);
            }}
          >
            <Button style={{ marginInlineStart: 0 }} danger loading={updateLoaiSuKienLoading}>
              Xóa
            </Button>
          </Popconfirm>
        ]}
      >
        <Form
          form={formUpdateLoaiSuKien}
          onFinish={(values) => {
            if (!selectedLoaiSuKienId.current) return;
            handleLoaiSuKienUpdate(selectedLoaiSuKienId.current, values);
          }}
        >
          <Input label='Tên loại sư kiện' name={'tenSuKien'} />
        </Form>
      </Modal>
    </>
  );
}
