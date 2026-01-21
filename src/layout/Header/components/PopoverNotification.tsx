import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Badge, List, Popover, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PopoverNotificationProps, PopoverNotificationRef } from '../types';
import NotificationItem from './NotificationItem';
import PopoverAlert from './PopoverAlert';
import SkeletonNotification from '@/components/Business/Skeletons/Notification';
import { ThongBaoCanhBaoEnum } from '@/constants/business/enums';
import { NotificationApi, TraoDoiThongTinApi } from '@/service/API';
import { PAGE_SIZE } from '@/utilities/pagination';

const PopoverNotification = forwardRef(function PopoverNotification(
  { children }: PopoverNotificationProps,
  ref: ForwardedRef<PopoverNotificationRef>
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [afterOpen, setAfterOpen] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>();
  const [unreadNotifications, setUnreadNotifications] = useState<NotificationApi.Notification[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [tabActive, setTabActive] = useState<ThongBaoCanhBaoEnum>(ThongBaoCanhBaoEnum.ThongBao);
  const [canhBaoCount, setCanhBaoCount] = useState<number>();

  const hasMore = parseInt(`${total / PAGE_SIZE}`) + (total % PAGE_SIZE > 0 ? 1 : 0) - 1 > page;

  const totalNotiCount = Number(canhBaoCount) + Number(unreadNotificationsCount) || 0;

  const observer = useRef<any>(null);

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && afterOpen) {
          setPage((current) => current + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, afterOpen]
  );

  useImperativeHandle(ref, () => ({
    getUnreadNotificationsCount
  }));

  useEffect(() => {
    getUnreadNotifications();
  }, [page]);

  const getUnreadNotifications = async () => {
    try {
      setLoading(true);
      const res = await NotificationApi.getNotifications({ page: page, size: PAGE_SIZE });
      if (page !== 0) {
        setUnreadNotifications((current) => [...current, ...res.data.list]);
        setTotal(res.data.total);
        return;
      }
      setUnreadNotifications(res.data.list);
      setTotal(res.data.total);
    } catch (_) {
      //
    } finally {
      setLoading(false);
    }
  };

  const getUnreadNotificationsCount = async () => {
    try {
      const [thongBaoRes, canhBaoRes] = await Promise.all([
        NotificationApi.getUnreadNotificationsCount(),
        TraoDoiThongTinApi.getdanhSachTraoDoiThongTinNhanDenHanTraLoi()
      ]);
      setUnreadNotificationsCount(Number(thongBaoRes.data));
      setCanhBaoCount(Number(canhBaoRes.data.length));
    } catch (_) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    /// getUnreadNotificationsCount();
  }, []);

  function handleRedirectItem(item: NotificationApi.Notification) {
    item?.url && navigate(item.url);
    handleClosePopup();
  }

  function handleRedirectViewAll() {
    navigate('/notification');
    handleClosePopup();
  }

  function handleClosePopup() {
    setOpen(false);
  }

  return (
    <Popover
      destroyTooltipOnHide
      className='cursor-pointer'
      overlayInnerStyle={{ padding: 0 }}
      trigger={'click'}
      afterOpenChange={(visible) => {
        setAfterOpen(visible);
        if (!visible) return;
        setPage(0);
        getUnreadNotificationsCount();
        setTabActive(ThongBaoCanhBaoEnum.ThongBao);
      }}
      onOpenChange={setOpen}
      open={open}
      arrow={false}
      title={
        <div className='flex justify-between items-center py-1 px-3'>
          {/* <Typography.Text>Danh sách thông báo</Typography.Text> */}
          <Tabs
            rootClassName='alert-popup'
            defaultActiveKey={ThongBaoCanhBaoEnum.ThongBao}
            onChange={(activeKey) => {
              setTabActive(activeKey as ThongBaoCanhBaoEnum);
            }}
            items={[
              {
                label: (
                  <>
                    Thông báo&nbsp;
                    <Badge count={unreadNotificationsCount} />
                  </>
                ),
                key: ThongBaoCanhBaoEnum.ThongBao
              },
              {
                label: (
                  <>
                    Cảnh báo&nbsp;
                    <Badge count={canhBaoCount} />
                  </>
                ),
                key: ThongBaoCanhBaoEnum.CanhBao
              }
            ]}
          />
          <Typography.Link
            underline
            style={{ color: 'var(--gt-primary-color)', fontWeight: 600 }}
            onClick={async () => {
              try {
                setLoading(true);
                await NotificationApi.markAllNoti();
              } catch (_) {
                //
              } finally {
                setLoading(false);
              }
            }}
          >
            Đánh dấu đọc tất cả
          </Typography.Link>
        </div>
      }
      content={
        <div className='noti-popup h-[600px] w-96'>
          {tabActive === ThongBaoCanhBaoEnum.ThongBao ? (
            <>
              <List
                loading={loading}
                dataSource={unreadNotifications}
                className='notification-list'
                itemLayout='vertical'
                renderItem={(item, index) => {
                  if (unreadNotifications.length === index + 1) {
                    return (
                      <List.Item className='notification-item last-noti' ref={lastElementRef}>
                        <NotificationItem
                          onClick={() => handleRedirectItem(item)}
                          notification={item}
                          updateUnreadMailsCount={() => {
                            unreadNotificationsCount && setUnreadNotificationsCount(unreadNotificationsCount - 1);
                          }}
                        />
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item className='notification-item'>
                      <NotificationItem
                        onClick={() => handleRedirectItem(item)}
                        notification={item}
                        updateUnreadMailsCount={() => {
                          unreadNotificationsCount && setUnreadNotificationsCount(unreadNotificationsCount - 1);
                        }}
                      />
                    </List.Item>
                  );
                }}
              />
              {loading && <SkeletonNotification />}
              <Typography.Link className='noti-popup-footer' onClick={handleRedirectViewAll}>
                Xem tất cả
              </Typography.Link>
            </>
          ) : (
            <PopoverAlert
              closePopup={() => {
                handleClosePopup();
              }}
            />
          )}
        </div>
      }
    >
      <Badge count={totalNotiCount} size='small' offset={['-5%', '10%']}>
        {children}
      </Badge>
    </Popover>
  );
});

export default PopoverNotification;
