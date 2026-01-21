import { Col, Row } from 'antd';
import { DateRangePicker, Input } from '@/components/Atoms';
import { pastRangePresets } from '@/constants';
import { disabledFutureDate } from '@/utilities/date';

const FormAdvancedSearch = () => {
  return (
    <Row gutter={[8, 8]}>
      {/* <Col span={5}>
        <Select
          showSearch
          mode='multiple'
          name='type'
          label='Loại thông báo'
          options={Object.values(notificationTypeOptions)}
        />
      </Col> */}
      <Col span={8}>
        <DateRangePicker name='date' label='Ngày' disabledDate={disabledFutureDate} presets={pastRangePresets} />
      </Col>
      <Col span={11}>
        <Input name='keySearch' label='Từ khóa' />
      </Col>
    </Row>
  );
};

export default FormAdvancedSearch;
