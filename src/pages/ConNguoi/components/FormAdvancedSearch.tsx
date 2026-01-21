import { Col, Row } from 'antd';
import { DateRangePicker, Input } from '@/components/Atoms';
import { disabledFutureDate } from '@/utilities/date';

const FormAdvancedSearch = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={6}>
        <Input label='Họ và tên' name='hoTen' />
      </Col>
      <Col span={6}>
        <Input label='Số CCCD/Hộ chiếu' name='soCccd' />
      </Col>
      <Col span={6}>
        <DateRangePicker
          label='Ngày sinh'
          name={'ngaySinh'}
          placeholder={['Từ ngày', 'đến ngày']}
          disabledDate={disabledFutureDate}
        />
      </Col>
    </Row>
  );
};

export default FormAdvancedSearch;
