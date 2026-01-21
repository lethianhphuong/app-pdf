import { Col, Form, Row } from 'antd';
import SelectCanBo from './SelectCanBo';
import { defaultCanBoConfig, defaultDonViConfig } from './config';
import {
  CanBoOption,
  DonViConfigProp,
  SelectCanBoByDonViComponentProps,
  SelectCanBoByDonViProps,
  SelectCanBoByMaDonViProps
} from './types';
import { InfiniteSelect, TextTooltip } from '@/components/Atoms';
import { THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE } from '@/constants/business/const';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { DonViApi, UserApi } from '@/service/API';
// import { PAGE_SIZE } from '@/utilities/pagination';
import { isObject } from '@/utilities/typeof';

const SelectCanBoByDonVi: React.FC<SelectCanBoByDonViProps> = ({ hasDonViComponent = false, maDonVi, ...rest }) => {
  const { currentUser } = useAccountLogin();
  const canBoConfig = { ...defaultCanBoConfig, ...rest.canBoConfig };
  const donViConfig = { ...defaultDonViConfig, ...rest.donViConfig } as DonViConfigProp;

  async function fetchDanhSachCanBo(maDonVi?: string): Promise<CanBoOption[] | undefined> {
    if (!maDonVi) return;
    const res = await UserApi.searchCanBoByKeySearchAndOrg({
      page: 0,
      size: 999,
      organization: maDonVi
    });
    return canBoConfig?.filterCurrentUser ? res.data.list.filter((item) => item.id !== currentUser?.id) : res.data.list;
  }

  return hasDonViComponent ? (
    <SelectCanBoByDonViComponent
      canBoConfig={canBoConfig}
      donViConfig={donViConfig}
      listFn={fetchDanhSachCanBo}
      disabledCanBoWhenDonViNoValue={
        isObject(hasDonViComponent) ? hasDonViComponent?.disabledCanBoWhenDonViNoValue : hasDonViComponent
      }
    />
  ) : (
    <SelectCanBoByMaDonVi canBoConfig={canBoConfig} maDonVi={maDonVi} listFn={fetchDanhSachCanBo} />
  );
};

const SelectCanBoByDonViComponent: React.FC<SelectCanBoByDonViComponentProps> = ({
  disabledCanBoWhenDonViNoValue = false,
  listFn,
  canBoConfig,
  donViConfig
}) => {
  const form = Form.useFormInstance();
  const donViValue: Common.OptionWithKey<string> | undefined = Form.useWatch(donViConfig.name, form);
  const maDonVi = donViValue?.value;

  async function fetchDanhSachDonVi({ page, size, keySearch }: { page: number; size: number; keySearch?: string }) {
    return DonViApi.getDanhSachDonVi({
      page,
      size,
      keySearch,
      organizationLevel: donViConfig?.organizationLevel,
      parentCode: donViConfig?.parentCode
    });
  }

  function handleChangeDonVi(value: any, option: any) {
    form.resetFields([canBoConfig.name]);
    canBoConfig.onChange && canBoConfig.onChange(value, option);
  }

  return (
    <Row gutter={[8, 8]}>
      <Col {...donViConfig?.col}>
        <InfiniteSelect
          listFn={fetchDanhSachDonVi}
          onChange={handleChangeDonVi}
          {...donViConfig}
          optionRender={(option) => {
            const donViCu = option?.data?.fullData?.endDate === THE_TIME_OF_PROVINCICAL_MERGER_OFFICIALLY_ACTIVE;
            return (
              <TextTooltip>
                {option.label}
                {donViCu && ` (Không hiện hành)`}
              </TextTooltip>
            );
          }}
        />
      </Col>
      <Col {...canBoConfig?.col}>
        <SelectCanBo
          listFn={listFn}
          maDonVi={maDonVi}
          disabled={disabledCanBoWhenDonViNoValue ? !maDonVi : undefined}
          {...canBoConfig}
        />
      </Col>
    </Row>
  );
};

const SelectCanBoByMaDonVi: React.FC<SelectCanBoByMaDonViProps> = ({ maDonVi, listFn, canBoConfig }) => {
  return <SelectCanBo listFn={listFn} maDonVi={maDonVi} {...canBoConfig} />;
};

export default SelectCanBoByDonVi;
