import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Form, Row, Spin, Tooltip } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import CompDiaChi from '../components/CompDiaChi/CompDiaChi';
import QuanHeGiaDinh from '../components/QuanHeGiaDinh';
import TonGiaoChucSac from '../components/TonGiaoChucSac';
import { FormThongTinConNguoiProps } from '../types';
import { ImageUpload } from './ImageUpload';
import { Collapse, DatePicker, Input, Select } from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';
import { DEFAULT_QUOC_GIA, maxLengthConfig, minLengthConfig } from '@/constants';
import {
  DanhMucEnums,
  FormNameDoiTuongEnums,
  NGHE_NGHIEP_KHAC_CODE,
  TypeViewCoNguoi
} from '@/constants/business/enums';
import { useDanhMuc } from '@/hooks';
import { useGetCommonDanhMuc } from '@/hooks/business/useGetCommonDanhMuc';
import { ruleMaxLength, ruleNgaySinh, ruleNoSpecialCharacter, ruleSoDienThoai } from '@/utilities/form/rules/common';

const dataSelectBoolear: BaseOptionType[] = [
  { value: true, label: 'Có' },
  { value: false, label: 'Không' }
];

function FormConNguoi({ form, typeView, ...formProps }: FormThongTinConNguoiProps) {
  const [
    danhMucGioiTinh,
    // danhMucDanToc,
    danhMucQuocTich,
    danhMucNgheNghiep,
    danhMucTrinhDoVanHoa,
    danhMucThanhPhanGiaDinh,
    danhMucPhanLoaiDangVien
  ] = useDanhMuc([
    DanhMucEnums.GioiTinh,
    DanhMucEnums.QuocTich,
    DanhMucEnums.NgheNghiep,
    DanhMucEnums.TrinhDoVanHoa,
    DanhMucEnums.ThanhPhanGiaDinh,
    DanhMucEnums.PhanLoaiDangVien
  ]);

  const { resultsDanhMuc, isFetching } = useGetCommonDanhMuc([DanhMucEnums.DanToc, DanhMucEnums.QuocTich]);
  const { danhMucDanToc } = resultsDanhMuc;

  console.log(isFetching, danhMucDanToc, 'isFetching');

  const [anhDoiTuongLoading, _setAnhDoiTuongLoading] = useState(false);
  const [anhChanDung, _setAnhChanDung] = useState<string>();

  const soCccd = Form.useWatch(['conNguoi', 'soCccd'], form);
  const ngheNghiep = Form.useWatch(['conNguoiChiTiet', 'ngheNghiep'], form);
  const isCanBoDangVien = Form.useWatch(['conNguoiChiTiet', 'isCanBoDangVien'], form);
  const isTienAnTienSu = Form.useWatch(['conNguoiChiTiet', 'isTienAnTienSu'], form);
  const suDungDiaChiCu: boolean = Form.useWatch(['conNguoi', 'suDungDiaChiCu'], form);

  return (
    <Form form={form} {...formProps}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Flex gap={8}>
            <Spin spinning={anhDoiTuongLoading} style={{ width: '100%', height: '100%' }}>
              <div className='flex flex-col gap-4' style={{ minWidth: '200px' }}>
                <ImageUpload
                  className='mt-2 text-center'
                  defaultImage={anhChanDung && `data:image/jpeg;base64,${anhChanDung}`}
                />
              </div>
            </Spin>
            <Flex>
              <Row gutter={[8, 8]}>
                {/* ROW 1 */}
                <Col span={6}>
                  <Input
                    label='Họ và tên'
                    name={['conNguoi', 'hoTen']}
                    required
                    capitalize
                    rules={[ruleMaxLength(maxLengthConfig.sm), ruleNoSpecialCharacter]}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    label='Giới tính'
                    name={['conNguoi', 'maGioiTinh']}
                    required
                    labelInValue
                    showSearch
                    options={danhMucGioiTinh.map((item) => ({ label: item.name, value: item.code }))}
                  />
                </Col>
                <Col span={4}>
                  <Input
                    label='Ngày sinh'
                    name={['conNguoi', 'ngaySinh']}
                    required
                    validateDebounce={500}
                    rules={[ruleNgaySinh]}
                  />
                </Col>
                <Col span={4}>
                  <Input
                    label='Số CMT/CCCD'
                    name={['conNguoi', 'soCccd']}
                    rules={[ruleNoSpecialCharacter, ruleMaxLength(maxLengthConfig.xxs)]}
                  />
                </Col>
                <Col span={6}>
                  <Flex gap={8}>
                    {!soCccd && <Input label='Lý do không có CCCD/CMND' name={['chiTietConNguoi', 'lyDoKhongCCCD']} />}
                    <Tooltip title='Tra cứu CSDLQG và DC'>
                      <Button
                        className='mt-2'
                        type='primary'
                        icon={<SearchOutlined />}
                        // onClick={() => {
                        //     onTraCuuCSDLQGvDC();
                        // }}
                        // disabled={!!hasPidConNguoiDanCu}
                      >
                        Tra cứu
                      </Button>
                    </Tooltip>
                  </Flex>
                </Col>
                {/* ROW 2 */}

                <Col span={6}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Input
                        label='Tên gọi khác'
                        name={['conNguoi', 'tenGoiKhac']}
                        rules={[ruleMaxLength(maxLengthConfig.ss), ruleNoSpecialCharacter]}
                      />
                    </Col>
                    <Col span={12}>
                      <DatePicker label='Ngày cấp CCCD' name={['conNguoi', 'ngayCap']} />
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Input
                    label='Nơi cấp CCCD'
                    name={['conNguoi', 'noiCap']}
                    rules={[ruleMaxLength(maxLengthConfig.ss)]}
                  />
                </Col>
                <Col span={6}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Input
                        label='Hộ chiếu'
                        name={['conNguoi', 'soHoChieu']}
                        rules={[ruleMaxLength(maxLengthConfig.ss)]}
                      />
                    </Col>
                    <Col span={12}>
                      <DatePicker label='Ngày cấp hộ chiếu' name={['conNguoi', 'ngayCapHoChieu']} />
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Input label='Nơi cấp hộ chiếu' name={['conNguoi', 'noiCapHoChieu']} />
                </Col>

                {/* ROW 3 */}

                <Col span={6}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Select
                        label='Dân tộc'
                        name={['conNguoi', 'danToc']}
                        showSearch
                        labelInValue
                        // options={danhMucDanToc.map((item) => ({ label: item.name, value: item.code }))}
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        label='Quốc tịch'
                        name={['conNguoi', 'quocTich']}
                        showSearch
                        labelInValue
                        options={danhMucQuocTich.map((item) => ({ label: item.name, value: item.code }))}
                        initialValue={DEFAULT_QUOC_GIA}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row>
                    <Col span={ngheNghiep?.value == NGHE_NGHIEP_KHAC_CODE ? 12 : 24}>
                      <Select
                        label='Nghề nghiệp'
                        name={['conNguoiChiTiet', 'ngheNghiep']}
                        showSearch
                        labelInValue
                        options={danhMucNgheNghiep.map((item) => ({ label: item.name, value: item.code }))}
                      />
                    </Col>
                    <Col span={12}>
                      {ngheNghiep?.value == NGHE_NGHIEP_KHAC_CODE && (
                        <Input
                          label='Nghề nghiệp rõ'
                          name={['conNguoiChiTiet', 'ngheNghiepRo']}
                          rules={[ruleMaxLength(maxLengthConfig.ss)]}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Input
                    label='Chức vụ, quyền hạn'
                    name={['conNguoiChiTiet', 'tenChucVuQuyenHan']}
                    rules={[ruleMaxLength(maxLengthConfig.ss)]}
                  />
                </Col>
                <Col span={6}>
                  <Input
                    label='Nơi làm việc'
                    name={['conNguoiChiTiet', 'noiCongTac']}
                    rules={[ruleMaxLength(maxLengthConfig.ss)]}
                  />
                </Col>

                {/* ROW 4 */}

                <Col span={6}>
                  <Select
                    label='Trình độ văn hóa'
                    name={['conNguoi', 'maTrinhDoHocVan']}
                    showSearch
                    labelInValue
                    options={danhMucTrinhDoVanHoa.map((item) => ({ label: item.name, value: item.code }))}
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Thành phần gia đình'
                    name={['conNguoi', 'thanhPhanGiaDinh']}
                    showSearch
                    labelInValue
                    options={danhMucThanhPhanGiaDinh.map((item) => ({ label: item.name, value: item.code }))}
                  />
                </Col>
                <Col span={6}>
                  <TonGiaoChucSac
                    form={form}
                    tonGiao={{ label: 'Tôn giáo', name: ['conNguoi', 'maTonGiao'] }}
                    chucSac={{ label: 'Chức sắc', name: ['conNguoi', 'maChucSacTonGiao'] }}
                  />
                </Col>
                <Col span={6}>
                  <Row>
                    <Col span={isCanBoDangVien?.value ? 12 : 24}>
                      <Select
                        label='Là đảng viên'
                        name={['conNguoiChiTiet', 'isCanBoDangVien']}
                        showSearch
                        labelInValue
                        options={dataSelectBoolear}
                      />
                    </Col>
                    <Col span={12}>
                      {isCanBoDangVien?.value && (
                        <Select
                          label='Là đảng viên'
                          name={['conNguoiChiTiet', 'maLoaiDangVien']}
                          showSearch
                          options={danhMucPhanLoaiDangVien.map((item) => ({ label: item.name, value: item.code }))}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>

                {/* ROW 5 */}

                <Col span={6}>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Input
                        label='Số điện thoại'
                        name={['conNguoi', 'soDienThoai']}
                        rules={[ruleMaxLength(minLengthConfig.md), ruleSoDienThoai]}
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        label='Tiền án/ Tiền sự'
                        name={['conNguoiChiTiet', 'isTienAnTienSu']}
                        labelInValue
                        options={dataSelectBoolear}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={18}>
                  <Input
                    label='Thông tin tiền án, tiền sự'
                    required={isTienAnTienSu?.value}
                    name={['conNguoiChiTiet', 'thongTinTienAnTienSu']}
                  />
                </Col>
              </Row>
            </Flex>
          </Flex>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            {/* //ROW */}

            <Col span={18}>
              <Card>
                <Row gutter={[8, 8]}>
                  <Col span={24} style={{ height: 36 }}>
                    <Checkbox
                      label='Địa chỉ trước khi sáp nhập địa giới hành chính'
                      name={['conNguoi', 'suDungDiaChiCu']}
                    />
                  </Col>

                  <Col span={24}>
                    <CompDiaChi basePath={['noiSinh']} labelSoNha='Nơi sinh' suDungDiaChiCu={suDungDiaChiCu} />
                  </Col>
                  <Col span={24}>
                    <CompDiaChi basePath={['queQuan']} labelSoNha='Quê quán' suDungDiaChiCu={suDungDiaChiCu} />
                  </Col>
                  <Col span={24}>
                    <CompDiaChi basePath={['noiDKTT']} labelSoNha='Nơi ĐKTT' suDungDiaChiCu={suDungDiaChiCu} />
                  </Col>
                  <Col span={24}>
                    <CompDiaChi basePath={['noiTamTru']} labelSoNha='Nơi tạm trú' suDungDiaChiCu={suDungDiaChiCu} />
                  </Col>
                  <Col span={24}>
                    <CompDiaChi
                      basePath={['noiOHienTai']}
                      labelSoNha='Nơi ở hiện tại'
                      suDungDiaChiCu={suDungDiaChiCu}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* //ROW */}

            <Col span={6}>
              <Card>
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Select
                      label='Tệ nạn ma túy'
                      name={['conNguoiChiTiet', 'teNanMaTuy']}
                      labelInValue
                      options={dataSelectBoolear}
                    />
                  </Col>

                  <Col span={24}>
                    <Select
                      label='Lực lượng vũ trang'
                      name={['conNguoiChiTiet', 'lucLuongVuTrang']}
                      labelInValue
                      options={dataSelectBoolear}
                    />
                  </Col>

                  <Col span={24}>
                    <Select
                      label='Đối tượng nghiệp vụ'
                      name={['conNguoiChiTiet', 'doiTuongNghiepVu']}
                      labelInValue
                      options={dataSelectBoolear}
                    />
                  </Col>

                  <Col span={24}>
                    <Input label='Tình trạng sức khoẻ' name={['conNguoiChiTiet', 'tinhTrangSucKhoe']} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {typeView != TypeViewCoNguoi.QUAN_HE && (
        <Collapse
          className='mt-2'
          defaultActiveKey={FormNameDoiTuongEnums.QuanHeGiaDinh}
          items={[
            {
              key: FormNameDoiTuongEnums.QuanHeGiaDinh,
              label: 'Mối quan hệ',
              children: <QuanHeGiaDinh />
            }
          ]}
        />
      )}
    </Form>
  );
}

export default FormConNguoi;
