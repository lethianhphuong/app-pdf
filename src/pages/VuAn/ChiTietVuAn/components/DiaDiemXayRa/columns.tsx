import { TableColumnsType } from 'antd';
import { TextTooltip } from '@/components/Atoms';

export const columns: TableColumnsType = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: 50,
    align: 'center',
    render: (_value, _record, index) => {
      return <>{index + 1}</>;
    }
  },
  {
    title: 'Địa điểm xảy ra',
    dataIndex: 'diaChi',
    width: '90%',
    render(value) {
      return <TextTooltip>{value}</TextTooltip>;
    }
  },
  {
    title: 'Địa điểm chính',
    dataIndex: 'diaDiemXayRa',
    width: 220,
    render(value) {
      return <TextTooltip>{value}</TextTooltip>;
    }
  }
];
