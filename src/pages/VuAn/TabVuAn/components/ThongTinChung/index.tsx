import { useEffect } from 'react';
import { Descriptions } from 'antd';
import { Collapse } from '@/components/Atoms';
import { useLocation } from '@/hooks';
import { VuAnApi } from '@/service/API';
import { VuAnResponse } from '@/service/API/vu-an/types';

const ThongTinChung: React.FC<{
  setLoading: (loading: boolean) => void;
  dataVuAn: VuAnResponse | null;
  setDataVuAn: (dataVuAn: VuAnResponse | null) => void;
}> = ({ setLoading, dataVuAn, setDataVuAn }) => {
  //#region Contructor
  const { query } = useLocation();

  //#region Descriptions
  const labelStyle = { color: 'rgb(9, 120, 90)', fontWeight: 600, fontSize: 14 };
  const contentStyle = { color: 'blac' };

  const labelStyleRed = { color: 'red', fontWeight: 600, fontSize: 14 };
  const contentStyleRed = { color: 'red' };
  //#endregion

  //#endregion

  //#region Function
  async function onGetDetail(id: string) {
    try {
      setLoading(true);
      const res = await VuAnApi.getDetailVuAn(id);
      setDataVuAn(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //#endregion

  //#region onChange
  useEffect(() => {
    if (query?.id) {
      onGetDetail(query.id);
    }
  }, []);
  //#endregion

  return (
    <>
      <Descriptions layout='horizontal' column={4} size='small' className='ml-2'>
        <Descriptions.Item label='Mã vụ án' span={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.maVuAn}
        </Descriptions.Item>
        <Descriptions.Item label='Mức độ' span={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.mucDo}
        </Descriptions.Item>
        <Descriptions.Item label='Thời hạn' span={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.thoiHan}
        </Descriptions.Item>
        <Descriptions.Item label='Số hồ sơ' span={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.soHoSo}
        </Descriptions.Item>
        <Descriptions.Item label='Đơn vị' span={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.donVi}
        </Descriptions.Item>
        <Descriptions.Item label='Trạng thái' span={3} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.trangThaiVu}
        </Descriptions.Item>
        <Descriptions.Item label='Tên vụ án' span={4} labelStyle={labelStyle} contentStyle={contentStyle}>
          {dataVuAn?.tenVuAn}
        </Descriptions.Item>
        <Descriptions.Item label='Tội danh khởi tố' span={4} labelStyle={labelStyleRed} contentStyle={contentStyleRed}>
          {dataVuAn?.dauHieuToiPham}
        </Descriptions.Item>
      </Descriptions>

      <Collapse
        items={[
          {
            key: 'clpThongTinVuAn',
            label: 'Thông tin vụ án',
            children: <></>
          },
          {
            key: 'clpDanhSachQdKhoiToNhapTach',
            label: 'Danh sách các quyết định khởi tố, nhập, tách vụ án',
            children: <></>
          }
        ]}
      />
    </>
  );
};

export default ThongTinChung;
