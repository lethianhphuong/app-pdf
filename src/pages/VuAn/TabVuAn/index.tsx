import { useMemo, useRef, useState } from 'react';
import { Descriptions } from 'antd';
import { useNavigate } from 'react-router-dom';
import ConNguoiLienQuan from './components/ConNguoiLienQuan';
import ThongTinChung from './components/ThongTinChung';
import { Button, Container, Modal } from '@/components/Atoms';
import Tabs from '@/components/Atoms/Tabs';
import { RouterUrl, TabChiTietVuAnEnums } from '@/constants/business/enums';
import ChiTietVuAn from '@/pages/VuAn/ChiTietVuAn';
import { VuAnResponse } from '@/service/API/vu-an/types';

const TabVuAn = function TabVuAn() {
  //#region Contructor
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const activeTab = TabChiTietVuAnEnums.ThongTinChung;
  const currentActiveTab = useRef<string | undefined>(activeTab);
  const [dataVuAn, setDataVuAn] = useState<VuAnResponse | null>(null);

  const [showBtnSua, setShowBtnSua] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [footerModal, setFooterModal] = useState<React.ReactNode>(null);

  const danhSachTab = useMemo(() => {
    return [
      {
        label: 'Thông tin vụ án',
        key: TabChiTietVuAnEnums.ThongTinChung,
        children: <ThongTinChung setLoading={setLoading} dataVuAn={dataVuAn} setDataVuAn={setDataVuAn} />
      },
      {
        label: 'Con người liên quan',
        key: TabChiTietVuAnEnums.ConNguoiLienQuan,
        children: <ConNguoiLienQuan dataVuAn={dataVuAn} />
      },
      {
        label: 'Kết luận điều tra',
        key: TabChiTietVuAnEnums.KetLuanDieuTra,
        children: undefined
      },
      {
        label: 'Mục lục văn bản',
        key: TabChiTietVuAnEnums.MucLucVanBan,
        children: undefined
      }
    ];
  }, [dataVuAn]);
  //#endregion

  //#region Function
  function handleTabChange(value?: TabChiTietVuAnEnums | string) {
    currentActiveTab.current = value;

    /**
     * Nếu là tab 1 thì hiện nút sửa
     */
    setShowBtnSua(TabChiTietVuAnEnums.ThongTinChung == value);
  }

  function onClose() {
    navigate(`/${RouterUrl.DsVuAn}`);
  }

  //#region Modal
  function onOpenModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
  }
  //#endregion

  //#endregion

  return (
    <Container loading={loading}>
      <div className='flex flex-col gap-2 h-full'>
        <Descriptions layout='horizontal' className='mt-2 ml-3 h-3'>
          <Descriptions.Item
            label='Vụ án hình sự số'
            labelStyle={{ color: 'black', fontWeight: 600, fontSize: 14 }}
            contentStyle={{ color: 'blac' }}
          >
            {dataVuAn?.maVuAn} - {dataVuAn?.tenVuAn}
          </Descriptions.Item>
        </Descriptions>

        <Tabs
          style={{ margin: '7px 0px 0px 7px' }}
          defaultActiveKey={activeTab}
          onChange={handleTabChange}
          items={danhSachTab as Tab[]}
        />

        <div className='fixed inset-x-20 bottom-0 pb-6 w-full flex justify-center gap-2 mb-2'>
          {showBtnSua && (
            <Button type='primary' onClick={onOpenModal}>
              Sửa
            </Button>
          )}
          <Button key='close' type='primary' danger onClick={onClose}>
            Đóng
          </Button>
        </div>

        <Modal
          title='Thông tin chi tiết vụ án'
          width='max(80%, 500px)'
          styles={{
            body: {
              maxHeight: '65vh'
            }
          }}
          open={showModal}
          loading={loading}
          onCancel={onCloseModal}
          footer={footerModal}
        >
          <ChiTietVuAn onCloseModal={onCloseModal} setFooterModal={setFooterModal} idVuAn={dataVuAn?.id} />
        </Modal>
      </div>
    </Container>
  );
};

export default TabVuAn;
