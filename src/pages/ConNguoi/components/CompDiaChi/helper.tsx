import { THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE } from '@/constants';
import { DanhMucApi } from '@/service/API';

export const filterTinhSauSapNhap = (administratives: DanhMucApi.DanhMucDiaDiem[]) => {
  return administratives.filter(
    (item) => (item as any)?.effectiveDate === THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE
  );
};
