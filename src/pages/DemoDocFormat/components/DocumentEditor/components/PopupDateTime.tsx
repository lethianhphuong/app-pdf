import { useEffect, useState } from 'react';
import { Col, DatePicker, Row } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs from 'dayjs';
import { DatetimeConfig } from '../types';
import { DATE_FORMAT, MONTH_FORMAT, YEAR_FORMAT } from '@/utilities/date';

interface PopupDateTimeProps extends PickerProps {
  config: DatetimeConfig;
  handleChange: (value: dayjs.Dayjs, type: PickerProps['picker'], fieldOption?: DatetimeConfig) => void;
  currentValue: any;
}

export function PopupDateTime({ config, handleChange, currentValue }: PopupDateTimeProps) {
  const [value, setValue] = useState<dayjs.Dayjs | undefined>();

  const [picker, setPicker] = useState<PickerProps['picker']>();
  const [show, setShow] = useState(false);

  const datePickerFormat = picker === 'year' ? YEAR_FORMAT : picker === 'month' ? MONTH_FORMAT : DATE_FORMAT;

  useEffect(() => {
    setValue(currentValue?.value ? dayjs(currentValue.value) : dayjs());
    setPicker(currentValue.type);
  }, [currentValue]);

  useEffect(() => {
    setShow(true);
  }, []);

  const handlePickerOpen = ({ type }: { type: PickerProps['picker'] }) => {
    setPicker(type);
  };

  return (
    <DatePicker
      format={datePickerFormat}
      open={show}
      autoFocus
      style={{ width: 288 }}
      value={value}
      onChange={(value) => {
        handleChange && handleChange(value, picker, config);
      }}
      picker={picker}
      disabledDate={config.disabledDate}
      renderExtraFooter={() => (
        <Row style={{ width: '100%' }}>
          <Col
            span={8}
            className='flex align-middle justify-center cursor-pointer'
            style={{
              height: 40,
              backgroundColor: !picker ? 'var(--gt-primary-color)' : undefined,
              color: !picker ? 'white' : undefined
            }}
            onClick={() => handlePickerOpen({ type: undefined })}
          >
            Ngày
          </Col>
          <Col
            onClick={() => handlePickerOpen({ type: 'month' })}
            span={8}
            className='flex align-middle justify-center cursor-pointer'
            style={{
              height: 40,
              borderLeft: '1px solid rgba(5, 5, 5, 0.06)',
              borderRight: '1px solid rgba(5, 5, 5, 0.06)',
              backgroundColor: picker === 'month' ? 'var(--gt-primary-color)' : undefined,
              color: picker === 'month' ? 'white' : undefined
            }}
          >
            Tháng
          </Col>
          <Col
            onClick={() => handlePickerOpen({ type: 'year' })}
            span={8}
            className='flex align-middle justify-center cursor-pointer'
            style={{
              height: 40,
              backgroundColor: picker === 'year' ? 'var(--gt-primary-color)' : undefined,
              color: picker === 'year' ? 'white' : undefined
            }}
          >
            Năm
          </Col>
        </Row>
      )}
    />
  );
}

export default PopupDateTime;
