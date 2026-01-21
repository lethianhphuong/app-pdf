import { TrangThaiDuongTruyenInternet } from '@/constants/business/enums';
import { LOCAL_STORAGE } from '@/constants/common/map';
import { modal, notification } from '@/staticAlert';

export const warningOnPoorConnection = (callBackFn: Function) => {
  const internetSpeed = localStorage.getItem(LOCAL_STORAGE.INTERNET_SPEED);
  const isPoorConnection =
    internetSpeed &&
    internetSpeed !== TrangThaiDuongTruyenInternet.Testing &&
    internetSpeed !== TrangThaiDuongTruyenInternet.NoInternet &&
    Number(internetSpeed) < 2;

  if (internetSpeed && internetSpeed === TrangThaiDuongTruyenInternet.NoInternet) {
    notification.error({ message: 'Mất kết nối đường truyền!!!' });
    return;
  }

  if (!isPoorConnection) {
    callBackFn();
    return;
  }

  modal.confirm({
    title: `Đường truyền mạng không ổn định (${internetSpeed} MB/s)`,
    content: 'Bạn có chắc chắn thực hiện thao tác này?',
    onOk() {
      callBackFn();
    },
    onCancel() {},
    okText: 'Vẫn tiếp tục thực hiện',
    cancelText: 'Quay lại ',
    centered: true
  });
};
