import { z } from 'zod';
import { VuAnResponse_Schema, VuDiaDiemResponse_Schema } from '@/service/API/vu-an/types';

export interface VuAnForm extends z.infer<typeof VuAnForm_Schema> {}
export const VuAnForm_Schema = VuAnResponse_Schema.extend({
  maTuyen: VuDiaDiemResponse_Schema.shape.maTuyen,
  maDacDiemDiaHinh: VuDiaDiemResponse_Schema.shape.maDacDiemDiaHinh,
  maLoaiDiaBan: VuDiaDiemResponse_Schema.shape.maLoaiDiaBan,
  maDiaBanDacTrung: VuDiaDiemResponse_Schema.shape.maDiaBanDacTrung
}).transform((arg) => {
  const newArg = { ...arg };
  const vuDiaDiemList = arg.vuDiaDiemList;
  const findDiaDiemChinh = vuDiaDiemList && vuDiaDiemList.find((e) => e.isDiaDiemChinh === true);
  if (findDiaDiemChinh) {
    newArg.maTuyen = findDiaDiemChinh.maTuyen;
    newArg.maDacDiemDiaHinh = findDiaDiemChinh.maDacDiemDiaHinh;
    newArg.maLoaiDiaBan = findDiaDiemChinh.maLoaiDiaBan;
    newArg.maDiaBanDacTrung = findDiaDiemChinh.maDiaBanDacTrung;
  }

  return newArg;
});
