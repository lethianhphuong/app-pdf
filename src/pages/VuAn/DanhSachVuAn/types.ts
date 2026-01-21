import { DsVuAnRequest } from '@/service/API/vu-an/types';

export interface DsVuAnFormValues extends DsVuAnRequest {
  listTrangThaiStr?: string;
  ngayLap?: string[];
}
