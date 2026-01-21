import React from 'react';
import { Collapse, Flex, Form, Tooltip } from 'antd';
import { ModalThongTinCaNhanProps } from '../types';
import { Button, Input, Modal } from '@/components/Atoms';
import { DanhMucStatus } from '@/constants/business/enums';
// import { heLucLuongOptions } from '@/constants/common/const';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { APP_CODE } from '@/service/API/user';

const ModalThongTinCaNhan: React.FC<ModalThongTinCaNhanProps> = (props) => {
  const { open, onClose } = props;

  const { currentUser, currentNhomQuyen } = useAccountLogin();

  const [form] = Form.useForm();

  function handleClose() {
    onClose();
  }

  const heLucLuongName = '';
  return (
    <Modal
      title='Thông tin cá nhân'
      width='500px'
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key='cancel' onClick={handleClose} type='primary' danger={true}>
          Đóng
        </Button>
      ]}
    >
      <Form form={form}>
        <Flex gap={8} vertical>
          <Tooltip title={currentUser?.account}>
            <Input label='Tên tài khoản' name='account' disabled initialValue={currentUser?.account} />
          </Tooltip>
          <Tooltip title={currentUser?.fullName}>
            <Input label='Họ và tên' name='fullName' disabled initialValue={currentUser?.fullName} />
          </Tooltip>
          <Tooltip title={currentUser?.militaryName}>
            <Input label='Cấp bậc' name='capBac' disabled initialValue={currentUser?.militaryName} />
          </Tooltip>
          <Tooltip title={currentUser?.positionName}>
            <Input label='Chức vụ' name='chucVu' disabled initialValue={currentUser?.positionName} />
          </Tooltip>
          <Tooltip title={currentUser?.policeNumber}>
            <Input label='Số hiệu CAND' name='số hiệu' disabled initialValue={currentUser?.policeNumber} />
          </Tooltip>
          <Tooltip title={currentUser?.organizationName + ' - ' + currentUser?.organizationParentName}>
            <Input
              label='Đơn vị'
              name='donVi'
              disabled
              initialValue={currentUser?.organizationName + ' - ' + currentUser?.organizationParentName}
            />
          </Tooltip>
          <Tooltip title={heLucLuongName}>
            <Input label='Hệ lực lượng' name='heLucLuong' disabled initialValue={heLucLuongName} />
          </Tooltip>
          <Tooltip title={currentUser?.phone}>
            <Input label='SĐT' name='soDienThoai' disabled initialValue={currentUser?.phone} />
          </Tooltip>
          <Tooltip title=''>
            <Input label='Email' name='email' disabled />
          </Tooltip>
          <Collapse
            items={[
              {
                label: 'Danh sách nhóm quyền',
                children: (
                  <>
                    {currentNhomQuyen
                      ?.filter((item) => item?.app === APP_CODE && item?.status === DanhMucStatus.Enabled)
                      ?.map((item) => <div key={item.id}>-&nbsp;{item.name}</div>)}
                  </>
                )
              }
            ]}
          />
          <Collapse
            items={[
              {
                label: 'Ảnh chữ ký',
                children: currentUser?.chuKy ? (
                  <img
                    src={`data:image/png;base64,${currentUser?.chuKy}`}
                    alt='Ảnh chữ ký'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                ) : (
                  <div>Không tìm thấy chữ ký</div>
                )
              }
            ]}
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default ModalThongTinCaNhan;
