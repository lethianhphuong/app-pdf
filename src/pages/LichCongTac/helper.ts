import { ScheduleEvent } from './types';
import { SuKienApi } from '@/service/API';

export function convertScheduleEventToSuKien(scheduleEvent: ScheduleEvent): SuKienApi.SuKien {
  return {
    idSuKien: scheduleEvent.Id,
    idDanhMuc: scheduleEvent.DanhMucId,
    tenDanhMuc: scheduleEvent.DanhMucName,
    ngayBatDau: scheduleEvent.StartTime,
    ngayKetThuc: scheduleEvent.EndTime,
    tenSuKien: scheduleEvent.Subject,
    diaDiem: scheduleEvent.Location,
    ghiChu: scheduleEvent.Description
  };
}

export function convertSuKienToScheduleEvent(suKien: SuKienApi.SuKien): ScheduleEvent {
  return {
    Id: suKien.idSuKien,
    Subject: suKien.tenSuKien,
    StartTime: suKien.ngayBatDau,
    EndTime: suKien.ngayKetThuc,
    Location: suKien.diaDiem,
    Description: suKien.ghiChu,
    DanhMucId: suKien.idDanhMuc,
    DanhMucName: suKien.tenDanhMuc,
    CategoryColor: '#2b5654'
  };
}
