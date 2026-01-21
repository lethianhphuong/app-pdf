import { SelectRemoteProps } from '@/components/Atoms';
import { DonViLevelEnums } from '@/constants/business/enums';

export interface SelectDonViTheoCapProps extends Omit<SelectRemoteProps, 'fetchData'> {
  capDonVi: DonViLevelEnums.LevelOne | DonViLevelEnums.LevelOneDiffer;
}
