import { sortBy } from 'lodash';
import { THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE } from '@/constants/business/const';
import { DanhMucApi } from '@/service/API';

export function transformOptionsXaPhuong(
  data: {
    label: string;
    value: string;
    others?: {
      maQuanHuyen: string;
      tenQuanHuyen: string;
      maTinhThanhPho: string;
      tenTinhThanhPho: string;
      endDate?: string;
    };
  }[]
) {
  return data.map((item) => ({
    value: item.value,
    label: item.label,
    fullLabel: (
      <>
        <b>{item.label} - </b>
        {item.others && (
          <i>
            {item.others?.tenQuanHuyen} - {item.others?.tenTinhThanhPho}
          </i>
        )}
        {getAdministrativeUnitTag(item.others?.endDate || '')}
      </>
    ),
    others: item.others
  }));
}

export const getAdministrativeUnitTag = (endDate: string) => {
  if (endDate === THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE) return <b> (Không hiện hành)</b>;
};

export const sortAdministratives = (administratives: DanhMucApi.DanhMucDiaDiem[]) => {
  return sortBy(administratives, (item) => {
    return (item as any)?.endDate === THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE ? 1 : 0;
  });
};
