import { VuAnResponse } from '@/service/API/vu-an/types';

const ConNguoiLienQuan: React.FC<{
  dataVuAn: VuAnResponse | null;
}> = () => {
  //#region Contructor

  //#endregion

  //#region Function

  //#endregion

  //#region onChange

  //#endregion

  return (
    <>
      {/* <Descriptions layout='horizontal' column={4} size='small' className='ml-2'>
          <Descriptions.Item label='Mã vụ án' span={1} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.maVuAn}
          </Descriptions.Item>
          <Descriptions.Item label='Mức độ' span={1} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.mucDo}
          </Descriptions.Item>
          <Descriptions.Item label='Thời hạn' span={1} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.thoiHan}
          </Descriptions.Item>
          <Descriptions.Item label='Số hồ sơ' span={1} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.soHoSo}
          </Descriptions.Item>
          <Descriptions.Item label='Đơn vị' span={1} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.donVi}
          </Descriptions.Item>
          <Descriptions.Item label='Trạng thái' span={3} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.trangThaiVu}
          </Descriptions.Item>
          <Descriptions.Item label='Tên vụ án' span={4} labelStyle={labelStyle} contentStyle={contentStyle} >
            {dataVuAn?.tenVuAn}
          </Descriptions.Item>
          <Descriptions.Item label='Tội danh khởi tố' span={4} labelStyle={labelStyleRed} contentStyle={contentStyleRed} >
            {dataVuAn?.dauHieuToiPham}
          </Descriptions.Item>
        </Descriptions> */}
    </>
  );
};

export default ConNguoiLienQuan;
