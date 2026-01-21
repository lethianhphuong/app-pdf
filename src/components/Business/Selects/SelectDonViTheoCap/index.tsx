import { SelectDonViTheoCapProps } from './types';
import { SelectRemote } from '@/components/Atoms';
import { DonViLevelEnums } from '@/constants/business/enums';
import { DonViApi } from '@/service/API';

async function getDanhSachDonViTheoCap(capDonVi: DonViLevelEnums.LevelOne | DonViLevelEnums.LevelOneDiffer) {
  try {
    const res = await DonViApi.getDanhSachDonViByLevel(capDonVi);
    return res?.data?.list?.map((item) => ({
      label: item.name,
      value: item.code,
      fullData: item
    }));
  } catch (_) {
    //
  }
  return [];
}

export default function SelectDonViTheoCap({
  label,
  name,
  showSearch = true,
  capDonVi = DonViLevelEnums.LevelOne,
  ...rest
}: SelectDonViTheoCapProps) {
  return (
    <SelectRemote
      label={label}
      name={name}
      showSearch={showSearch}
      labelInValue
      {...rest}
      fetchData={async () => {
        return await getDanhSachDonViTheoCap(capDonVi);
      }}
    />
  );
}
