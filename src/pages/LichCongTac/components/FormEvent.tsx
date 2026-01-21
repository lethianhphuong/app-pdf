import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Select, Textarea } from '@/components/Atoms';
import { DatePicker } from '@/components/Atoms/Datepicker';
import { Input } from '@/components/Atoms/Input';
import { SuKienApi } from '@/service/API';
import { DATE_TIME_FORMAT } from '@/utilities/date';

export default function FormEvent() {
  const [danhSachLoaiSuKien, setDanhSachLoaiSuKien] = useState<Common.OptionWithKey<string>[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getLoaiSuKien();
  }, []);

  const getLoaiSuKien = async () => {
    try {
      setLoading(true);
      const res = await SuKienApi.getDanhSachLoaiSuKien();
      const options = res.data.map((item) => ({
        label: item.tenDanhMuc,
        value: item.id
      }));
      setDanhSachLoaiSuKien(options);
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <Select
          name={'danhMuc'}
          label='Loại sự kiện'
          labelInValue
          options={danhSachLoaiSuKien}
          required
          loading={loading}
        />
      </Col>
      <Col span={16}>
        <Input name={'tenSuKien'} label='Tiêu đề' required />
      </Col>
      <Col span={8}>
        <DatePicker name={'ngayBatDau'} label='Ngày bắt đầu' format={DATE_TIME_FORMAT} showTime required />
      </Col>
      <Col span={8}>
        <DatePicker name={'ngayKetThuc'} label='Ngày kết thúc' format={DATE_TIME_FORMAT} showTime required />
      </Col>
      <Col span={24}>
        <Input name={'diaDiem'} label='Địa điểm' />
      </Col>
      <Col span={24}>
        <Textarea name={'ghiChu'} label='Ghi chú' />
      </Col>
    </Row>
  );
}
