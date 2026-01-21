import dayjs from 'dayjs';
import { dataConNguoiCV } from '../types';
import { ThongTinConNguoi } from '@/service/API/con-nguoi/types';

export const ConvertConNguoiChiTiet = function (thongTinCN: ThongTinConNguoi): dataConNguoiCV {
  const conNguoi = thongTinCN.conNguoi;

  return {
    ...thongTinCN,
    conNguoi: {
      ...conNguoi,
      ngayCap: conNguoi.ngayCap ? dayjs(conNguoi.ngayCap) : undefined,
      ngayCapHoChieu: conNguoi.ngayCapHoChieu ? dayjs(conNguoi.ngayCapHoChieu) : undefined
    }
  };
};
