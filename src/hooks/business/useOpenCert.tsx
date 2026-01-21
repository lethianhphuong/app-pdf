import { useState } from 'react';
import { Button } from '@/components/Atoms/Button';
import { Modal } from '@/components/Atoms/Modal';
import { kySoUrl } from '@/service';

export default function useOpenCert() {
  const [openCertModal, setOpenCertModal] = useState(false);

  const toogleOpenCert = () => {
    setOpenCertModal(!openCertModal);
  };

  const OpenCertModal = () => {
    return (
      <Modal
        open={openCertModal}
        onCancel={() => setOpenCertModal(false)}
        destroyOnClose
        title='Thông báo'
        footer={[
          <Button type='default' key='submit' onClick={() => setOpenCertModal(false)}>
            Hủy
          </Button>,
          <Button
            type='primary'
            key='submit'
            onClick={() => {
              window.open(`${kySoUrl}/signmultiPDFv7`, '_blank');
              setOpenCertModal(false);
            }}
          >
            Xác nhận
          </Button>
        ]}
      >
        <p>
          Trình duyệt sẽ mở tab mới. Hãy nhấn <b>Nâng cao {'>'} Tiếp tục truy cập localhost (không an toàn)</b> để thực
          hiện chức năng ký số
        </p>
        <i>(Thao tác này chỉ cần thực hiện với lần đầu ký số)</i>
      </Modal>
    );
  };

  return {
    OpenCertModal,
    toogleOpenCert
  };
}
