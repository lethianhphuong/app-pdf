import { z } from 'zod';
import { convertDiaDiemXayRa } from './helper';

export interface DiaDiemXayRaParams extends z.infer<typeof DiaDiemXayRaParams_Schema> {}
export const DiaDiemXayRaParams_Schema = z.object({
  ngayXayRa: z.string().optional(),
  gioXayRa: z.string().optional(),
  xayRaKhoang: z.string().optional(),
  diaDiemChiTiet: z.string().optional(),
  xa: z.string().optional(),
  huyen: z.string().optional(),
  tinh: z.string().optional()
});

export interface DiaDiemXayRaStore extends z.infer<typeof DiaDiemXayRaStore_Schema> {}
export const DiaDiemXayRaStore_Schema = DiaDiemXayRaParams_Schema.transform((arg) => ({
  ...arg,
  diaChi: convertDiaDiemXayRa(arg)
}));
