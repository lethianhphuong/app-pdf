import { useEffect, useState } from 'react';
import { Col, Form, Row, Space } from 'antd';
import DiaDiemXayRa from './components/DiaDiemXayRa';
import NguonKhoiTo from './components/NguonKhoiTo';
import ThongTinThongKe from './components/ThongTinThongKe';
import { VuAnForm, VuAnForm_Schema } from './types';
import { Button, Container, Input, Select, Textarea } from '@/components/Atoms';
import Checkbox from '@/components/Atoms/Checkbox';
import Label from '@/components/Atoms/Label';
import { trangThaiVuAnOptions } from '@/constants';
import { DanhMucEnums } from '@/constants/business/enums';
import { useDanhMuc } from '@/hooks';
import { useFocusOnForm } from '@/hooks/common/form/useFocusOnForm';
import { VuAnApi } from '@/service/API';
import { VuAnResponse } from '@/service/API/vu-an/types';

interface Props {
  onCloseModal?: VoidFunction;
  setFooterModal?: React.Dispatch<React.SetStateAction<React.ReactNode>>;

  idVuAn: string | undefined;
}

export default function ChiTietVuAn({ onCloseModal, setFooterModal, idVuAn }: Props) {
  //#region STATE & REFS
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<VuAnForm>();
  const [dataVuAn, setDataVuAn] = useState<VuAnResponse | null>(null);
  const maLoaiNguonVuAn = Form.useWatch('maLoaiNguonVuAn', form);
  //#endregion

  //#region CONSTANTS & DERIVED VALUES
  const focusFirstError = useFocusOnForm(form);
  const [DthsNguonKhoiTo, LoaiTuyenDuong, DiaBan, LoaiDiaBan, LoaiDiaBanDacTrung] = useDanhMuc([
    DanhMucEnums.DthsNguonKhoiTo,
    DanhMucEnums.LoaiTuyenDuong,
    DanhMucEnums.DiaBan,
    DanhMucEnums.LoaiDiaBan,
    DanhMucEnums.LoaiDiaBanDacTrung
  ]);
  //#endregion

  //#region HOOKS
  useEffect(() => {
    setFooterModal && setFooterModal(footerModal);
  }, []);

  useEffect(() => {
    if (idVuAn) {
      onGetDetail(idVuAn);
    }
  }, [idVuAn]);
  //#endregion

  //#region HANDLERS
  async function onGetDetail(id: string) {
    try {
      setLoading(true);
      const res = await VuAnApi.getDetailVuAn(id);
      setDataVuAn(res?.data);

      const dataParse = VuAnForm_Schema.safeParse(res?.data);
      if (dataParse.success) {
        console.log('tesst', dataVuAn, dataParse.data);
        form.setFieldsValue(dataParse.data);
      } else {
        console.log('safeParse error', dataParse.error.errors);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    console.log('onSave');

    try {
      const values = await form.validateFields();
      console.log('onSave values', values);
    } catch (error: any) {
      focusFirstError(error);
    }
  }

  function onDelete() {
    console.log('onDelete');
  }
  //#endregion

  //#region UTILITY FUNCTIONS
  const footerModal = () => {
    return [
      <Button key='submit' type='primary' onClick={onSave}>
        Lưu
      </Button>,
      <Button key='delete' type='default' danger className='!ms-0' onClick={onDelete}>
        Xóa
      </Button>,
      <Button key='close' type='primary' danger onClick={onCloseModal}>
        Đóng
      </Button>
    ].reverse();
  };
  //#endregion

  return (
    <>
      <Container loading={loading}>
        <Form form={form}>
          <div className='flex flex-col'>
            <Space direction='vertical'>
              <Row gutter={8}>
                <Col span={12}>
                  <Select
                    label='Đơn vị chịu trách nhiệm thực hiện'
                    name='donViPhuTrach'
                    options={Object.values(trangThaiVuAnOptions)}
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Địa danh ban hành văn bản'
                    name='maDiaDiemBanHanh'
                    options={Object.values(trangThaiVuAnOptions)}
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Viện kiểm sát nhân dân nhận'
                    name='listTrangThaiStr'
                    options={Object.values(trangThaiVuAnOptions)}
                  />
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={18}>
                  <Input label='Tên vụ án' name='tenVuAn' required />
                </Col>
                <Col span={6}>
                  <Select label='Mức độ' name='maMucDo' options={Object.values(trangThaiVuAnOptions)} />
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={24}>
                  <Textarea label='Nội dung vụ án' name='noiDung' />
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={4.5}>
                  <Label className='mt-1' label=''>
                    Địa điểm xảy ra vụ án
                  </Label>
                </Col>
                <Col span={3.5}>
                  <Checkbox label='Không xác định địa chỉ cụ thể' name='isXacDinhDiaDiemCT' />
                </Col>
                <Col span={16}>
                  <Checkbox label='Địa chỉ trước khi sáp nhập địa giới hành chính' name='suDungDiaChiCu' />
                </Col>
              </Row>

              <DiaDiemXayRa />

              <Row gutter={8} className='mt-5'>
                <Col span={6}>
                  <Select
                    label='Nguồn khởi tố'
                    name='maLoaiNguonVuAn'
                    options={DthsNguonKhoiTo.map((item) => ({ label: item.name, value: item.code }))}
                    required
                  />
                </Col>

                <NguonKhoiTo code={maLoaiNguonVuAn} />
              </Row>

              <ThongTinThongKe />

              <Row gutter={8} className='mt-5'>
                <Col span={6}>
                  <Select
                    label='Tuyến xảy ra'
                    name='maTuyen'
                    options={LoaiTuyenDuong.map((item) => ({ label: item.name, value: item.code }))}
                    required
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Đặc điểm địa hình'
                    name='maDacDiemDiaHinh'
                    options={DiaBan.map((item) => ({ label: item.name, value: item.code }))}
                    required
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Loại địa bàn'
                    name='maLoaiDiaBan'
                    options={LoaiDiaBan.map((item) => ({ label: item.name, value: item.code }))}
                    required
                  />
                </Col>
                <Col span={6}>
                  <Select
                    label='Địa bàn đặc trưng'
                    name='maDiaBanDacTrung'
                    options={LoaiDiaBanDacTrung.map((item) => ({ label: item.name, value: item.code }))}
                    required
                  />
                </Col>
              </Row>
            </Space>
          </div>
        </Form>
      </Container>
    </>
  );
}
