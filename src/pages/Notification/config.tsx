import { TableColumnsType } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { TextTooltip } from '@/components/Atoms';
import { NotificationApi } from '@/service/API';
import { formatDate } from '@/utilities/date';

export const columns: TableColumnsType<NotificationApi.Notification> = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    width: 200,
    render(value, record) {
      return (
        <TextTooltip ellipsis={{ tooltip: { title: value } }}>
          <Link to={record?.url} onClick={() => NotificationApi.markNoti(record.id)}>
            {value}
          </Link>
        </TextTooltip>
      );
    },
    fixed: 'left'
  },
  {
    title: 'Nội dung',
    dataIndex: 'content',
    width: 650,
    render(value) {
      return <TextTooltip>{HTMLReactParser(value || '')}</TextTooltip>;
    }
  },
  {
    title: 'Ngày nhận',
    dataIndex: 'receiveDate',
    width: 120,
    align: 'center',
    render(value) {
      return value && formatDate(value);
    }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'statusName',
    width: 150,
    render(value) {
      return <TextTooltip>{value}</TextTooltip>;
    }
  }
];
