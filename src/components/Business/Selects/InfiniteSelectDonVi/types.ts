import { BaseInfiniteSelectProps } from '@/components/Atoms';

export interface InfiniteSelectDonViProps extends Omit<BaseInfiniteSelectProps, 'listFn'> {
  organizationLevel?: string;
  parentCode?: string;
}
