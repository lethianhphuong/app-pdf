import { Col } from 'antd';
import { DatePicker, Input, Select } from '@/components/Atoms';
import { DanhMucEnums, LoaiNguonKhoiToEnums, donViKienNghiKhoiToVuAnOptions, pastDatePresets } from '@/constants';
import { useDanhMuc } from '@/hooks';
import { disabledFutureDate } from '@/utilities/date';

export default function NguonKhoiTo({ code }: { code: string | null | undefined }) {
  //#region STATE & REFS

  //#endregion

  //#region CONSTANTS & DERIVED VALUES
  const [DthsNguonKhoiToTuCTNV] = useDanhMuc([DanhMucEnums.DthsNguonKhoiToTuCTNV]);
  //#endregion

  //#region HOOKS

  //#endregion

  //#region HANDLERS

  //#endregion

  //#region UTILITY FUNCTIONS

  //#endregion

  switch (code) {
    case LoaiNguonKhoiToEnums.TinBaoVeToiPham:
      return (
        <>
          <Col span={6}>
            <DatePicker
              label='Ngày tiếp nhận (để thống kê)'
              name='ngayTiepNhanTuTinBao'
              presets={pastDatePresets}
              disabledDate={disabledFutureDate}
              required
            />
          </Col>
        </>
      );
    case LoaiNguonKhoiToEnums.TinBaoVeCongTacNghiepVu:
      return (
        <>
          <Col span={6}>
            <Select
              label='Phân loại nguồn'
              name='maPhanLoaiNguon'
              options={DthsNguonKhoiToTuCTNV.map((item) => ({ label: item.name, value: item.code }))}
              required
            />
          </Col>
        </>
      );
    case LoaiNguonKhoiToEnums.KienNghiKhoiTo:
      return (
        <>
          <Col span={6}>
            <Select
              label='Phân loại đơn vị kiến nghị khởi tố'
              name='maPhanLoaiDonViKhoiTo'
              options={Object.values(donViKienNghiKhoiToVuAnOptions)}
              required
            />
          </Col>
          <Col span={6}>
            <Input label='Tên đơn vị kiến nghị khởi tố' name='tenPhanLoaiDonViKhoiTo' required />
          </Col>
          <Col span={3}>
            <DatePicker
              label='Ngày VB'
              name='ngayKienNghi'
              presets={pastDatePresets}
              disabledDate={disabledFutureDate}
              required
            />
          </Col>
          <Col span={3}>
            <Input label='Số VB' name='soVanBanKienNghi' required />
          </Col>
        </>
      );
    default:
      return <></>;
  }
}
