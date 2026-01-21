import { Col, Row } from 'antd';
import Checkbox from '@/components/Atoms/Checkbox';

export default function ThongTinThongKe() {
  //#region STATE & REFS

  //#endregion

  //#region CONSTANTS & DERIVED VALUES
  const thongKeParam = 'vuAnThongKe';
  //#endregion

  //#region HOOKS

  //#endregion

  //#region HANDLERS

  //#endregion

  //#region UTILITY FUNCTIONS

  //#endregion

  return (
    <>
      <Row gutter={8}>
        <Col span={4}>
          <Checkbox label='Dư luận xã hội quan tâm' name={[thongKeParam, 'duocXaHoiQuanTam']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Hoạt động có tổ chức' name={[thongKeParam, 'coToChuc']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Điều tra mở rộng' name={[thongKeParam, 'dieuTraMoRong']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Ban chỉ đạo trung ương' name={[thongKeParam, 'banChiDaoTrungUong']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Ban nội chính trung ương' name={[thongKeParam, 'banNoiChinhTrungUong']} />
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={4}>
          <Checkbox label='Tín dụng đen' name={[thongKeParam, 'tinDungDen']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Hoạt động có băng nhóm' name={[thongKeParam, 'hdBangNhom']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Sử dụng vũ khí nóng' name={[thongKeParam, 'vuKhiNong']} />
        </Col>
        <Col span={4}>
          <Checkbox label='Ban chỉ đạo Tỉnh, Thành phố' name={[thongKeParam, 'banChiDaoTinh']} />
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
}
