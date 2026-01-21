import { useState } from 'react';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import '../styles.less';
import { NotificationStatusEnums } from '@/constants/business/enums';
import { NotificationApi } from '@/service/API';
import { formatDateTime } from '@/utilities/date';

export default function NotificationItem({
  notification,
  updateUnreadMailsCount,
  onClick
}: {
  notification: NotificationApi.Notification;
  updateUnreadMailsCount: () => void;
  onClick: () => void;
}) {
  const [notificationStatus, setNotificationStatus] = useState(notification.status);

  const markSeen = async () => {
    try {
      setNotificationStatus(NotificationStatusEnums.Seen);
      updateUnreadMailsCount();
      await NotificationApi.markNoti(notification.id);
    } catch (_) {
      setNotificationStatus(NotificationStatusEnums.Unseen);
    } finally {
      //
    }
  };

  return (
    <Card
      size='small'
      onClick={() => {
        onClick();
        if (`${notificationStatus}` === NotificationStatusEnums.Seen) return;
        markSeen();
      }}
      hoverable
      bordered={false}
      actions={[
        <div className='text-right' key='time'>
          <Typography.Text className='text-xs italic' style={{ color: 'var(--gt-primary-color)' }}>
            {formatDateTime(notification.receiveDate)}
          </Typography.Text>
        </div>
      ]}
    >
      <div style={{ width: '40px', fontSize: '18px' }} className='flex-none text-center'>
        {`${notificationStatus}` === NotificationStatusEnums.Unseen ? (
          <ExclamationCircleFilled style={{ color: 'var(--gt-warning-color)' }} />
        ) : (
          <CheckCircleFilled style={{ color: 'var(--gt-primary-color)' }} />
        )}
      </div>
      <div className='flex-1'>
        <Typography.Title level={5} style={{ marginBottom: 0, marginTop: 0 }}>
          {notification.title}
        </Typography.Title>
        <Typography.Paragraph
          style={{ marginBottom: 0 }}
          ellipsis={{
            tooltip: <>{HTMLReactParser(notification.content || '')}</>,
            rows: 2
          }}
        >
          {HTMLReactParser(notification.content || '')}
        </Typography.Paragraph>
      </div>
      <div
        className={`flex-none text-center ${`${notificationStatus}` === NotificationStatusEnums.Unseen ? 'unread' : ''}`}
      ></div>
    </Card>
  );
}
