import dayjs from 'dayjs';
import { SuKienApi } from '@/service/API';

export interface ScheduleEvent {
  Id: string;
  Subject: string;
  StartTime: string;
  EndTime: string;
  Location?: string;
  IsBlock?: boolean;
  StartTimezone?: string;
  EndTimezone?: string;
  Description?: string;
  IsAllDay?: boolean;
  RecurrenceID?: string;
  RecurrenceRule?: string;
  RecurrenceException?: string;
  IsReadonly?: boolean;
  FollowingID?: string;
  CategoryColor?: string;
  DanhMucId?: string;
  DanhMucName?: string;
}

export interface FormSuKien extends Omit<SuKienApi.SuKien, 'ngayBatDau' | 'ngayKetThuc' | 'idDanhMuc'> {
  ngayBatDau: dayjs.Dayjs;
  ngayKetThuc: dayjs.Dayjs;
  danhMuc: Common.OptionWithKey<string>;
}
