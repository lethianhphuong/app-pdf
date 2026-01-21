import { HeLucLuongEnums } from '@/constants/business/enums';

export interface DonVi {
  id: string;
  name: string;
  displayName: string;
  unsignedName: string;
  unsignedSign: string;
  fullName: string;
  sign: string;
  code: string;
  organizationLevel: string;
  organizationLevelName: string;
  province: string;
  status: number;
  statusName: string;
  organizationParent: string;
  organizationParentName: string;
  subSystem: HeLucLuongEnums;
  effectiveDate?: string;
  endDate?: string;
}
