import { InfiniteSelectDonViProps } from './types';
import { InfiniteSelect, TextTooltip } from '@/components/Atoms';
import { THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE } from '@/constants/business/const';
import { DonViApi } from '@/service/API';

export default function InfiniteSelectDonVi({
  label,
  name,
  organizationLevel,
  parentCode,
  ...rest
}: InfiniteSelectDonViProps) {
  return (
    <InfiniteSelect
      label={label}
      name={name}
      labelInValue
      config={{
        labelField: 'fullName',
        source: 'data.list',
        valueField: 'code'
      }}
      {...rest}
      optionRender={(option) => {
        const donViCu = option?.data?.fullData?.endDate === THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE;
        return (
          <TextTooltip>
            {option.label}
            {donViCu && ` (Không hiện hành)`}
          </TextTooltip>
        );
      }}
      listFn={async ({ page, size, keySearch }) => {
        return DonViApi.getDanhSachDonVi({ page, size, keySearch, organizationLevel, parentCode });
      }}
    />
  );
}
