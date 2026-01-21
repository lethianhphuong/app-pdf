import { Col, Row, Space } from 'antd';
import { DateRangePicker, Input, Select } from '@/components/Atoms';
import { pastRangePresets, trangThaiVuAnOptions } from '@/constants';
import { useDanhMucQueryMulti } from '@/hooks';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { DanhMucType } from '@/service/API/danhmuc/types';
import { disabledFutureDate } from '@/utilities/date';

const FormAdvancedSearch: React.FC = () => {
  const { currentUser } = useAccountLogin();

  const {
    results: { danhMucDthsDonViTiepNhan },
    isFetching
  } = useDanhMucQueryMulti([DanhMucType.DthsDonViTiepNhan], {
    [DanhMucType.DthsDonViTiepNhan]: { extraUrl: currentUser?.organization }
  });

  return (
    <Space direction='vertical'>
      <Row gutter={8}>
        <Col span={6}>
          <Input label='Mã số vụ án' name='maVuAn' />
        </Col>
        <Col span={6}>
          <Input label='Tên vụ án hình sự' name='tenVuAn' />
        </Col>
        <Col span={6}>
          <Select label='Trạng thái điều tra' name='listTrangThaiStr' options={Object.values(trangThaiVuAnOptions)} />
        </Col>
        <Col span={6}>
          <Input label='QĐ khởi tố' name='soQdKhoiTo' />
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={6}>
          <DateRangePicker
            presets={pastRangePresets}
            label='Ngày lập'
            name='ngayLap'
            disabledDate={disabledFutureDate}
          />
        </Col>
        <Col span={6}>
          <Select
            label='Đơn vị phụ trách'
            name='donViPhuTrach'
            mode='multiple'
            loading={isFetching}
            options={danhMucDthsDonViTiepNhan?.map((item) => ({ label: item.ten, value: item.ma }))}
          />
        </Col>
        <Col span={6}></Col>
        <Col span={6}></Col>
      </Row>
    </Space>
  );
};

export default FormAdvancedSearch;
