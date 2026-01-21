import { useEffect, useRef, useState } from 'react';
import { BellOutlined, CalendarOutlined, DownOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Flex, Image, Tooltip } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import '../styles.less';
import { PopoverNotificationRef } from '../types';
import ModalChangePassword from './ModalChangePassword';
import ModalThongTinCaNhan from './ModalThongTinCaNhan';
import PopoverNotification from './PopoverNotification';
import { env } from '@/config/env';
import useAccountLogin from '@/hooks/business/useAccountLogin';
import { notificationUrl } from '@/service';
import { NotificationApi, UserApi } from '@/service/API';
import { APP_CODE } from '@/service/API/user';
import { logout } from '@/utilities/auth';
import { isDev } from '@/utilities/env';

function HeaderMenu() {
  const { currentUser } = useAccountLogin();

  const [unreadMailsCount, setUnreadMailsCount] = useState<number>(0);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openThongTinCaNhan, setOpenThongTinCaNhan] = useState<boolean>(false);
  const [isMultipleApplication, setIsMultipleApplication] = useState(false);
  const notificationRef = useRef<PopoverNotificationRef>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = localStorage.getItem('authCode') || url.searchParams.get('authCode') || '';

    if (!authCode) {
      console.error("init SSE error: can't find authCode!");
      return;
    }

    const urlEndPoint = `${notificationUrl}/api/v1/subscribe/init?authCode=${authCode}&appCode=${APP_CODE}`;
    const eventSource = new EventSource(urlEndPoint);

    eventSource.onopen = () => {};

    eventSource.addEventListener('trigger', (event) => {
      const dataTrigger = event.data;

      switch (dataTrigger) {
        case 'mail':
          getUnreadMailsCount();
          break;
        case 'notification':
          // onGetUnreadNotificationCount({ type: localStorage.getItem('typeNotification') });
          notificationRef.current?.getUnreadNotificationsCount();
          break;
        case 'ntf_maintain':
          // setTrigger(state => state + 1)
          break;
        case 'log_out':
          logout();
          // logoutByEventLogoutReceived();
          break;
        default:
          break;
      }
    });

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CONNECTING) return;
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getUnreadMailsCount = async () => {
    try {
      const res = await NotificationApi.getUnreadMailsCount();
      setUnreadMailsCount(res.data);
    } catch (_) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;
    fetchDanhSachPhanMemTruyCap();
    getUnreadMailsCount();
  }, [currentUser?.id]);

  const fetchDanhSachPhanMemTruyCap = async () => {
    try {
      const res = await UserApi.getDanhSachPhanMemTruyCap();
      setIsMultipleApplication(res?.data.length > 1);
    } catch (error) {
      //
    }
  };

  const authChannel = new BroadcastChannel('auth');

  authChannel.onmessage = (event) => {
    if (event.data === 'logout') {
      logout();
    }
  };

  useEffect(() => {
    return () => {
      authChannel.close();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await NotificationApi.logoutNoti();
    } catch (_) {
      //
    } finally {
      authChannel.postMessage('logout');
      authChannel.close();
      logout();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Thông tin cá nhân',
      key: '1',
      onClick: () => {
        setOpenThongTinCaNhan(true);
      }
    },
    {
      label: 'Đổi mật khẩu',
      key: '2',
      onClick: () => {
        setOpenChangePassword(true);
      }
    },
    {
      label: 'Chọn phần mềm',
      key: '3',
      style: { display: isMultipleApplication ? 'block' : 'none' },
      onClick: () => {
        window.location.href = isDev ? env.API_URL_SSO : window.location.origin;
      }
    },
    {
      label: 'Đăng xuất',
      key: '4',
      onClick: handleLogout
    }
  ];

  return (
    <>
      <Flex gap={24} align='center' className='header-menu'>
        {currentUser && (
          <>
            <Tooltip title='Lịch công tác' trigger={['hover', 'focus']}>
              <Link to='/lich-cong-tac' className='flex align-middle'>
                <CalendarOutlined className='bg-transparent  text-xl' style={{ color: 'var(--gt-primary-color)' }} />
              </Link>
            </Tooltip>

            <Tooltip title='Email' trigger={['hover', 'focus']}>
              <Link to='/mailpage' className='flex align-middle'>
                <Badge count={unreadMailsCount} size='small' offset={['-5%', '10%']}>
                  <MailOutlined className='bg-transparent  text-xl' style={{ color: 'var(--gt-primary-color)' }} />
                </Badge>
              </Link>
            </Tooltip>

            <Tooltip title='Phản ánh' trigger={['hover', 'focus']}>
              <Link to='/feedback_management' className='flex align-middle'>
                <MessageOutlined className='bg-transparent  text-xl' style={{ color: 'var(--gt-primary-color)' }} />
              </Link>
            </Tooltip>

            <Tooltip title='Thông báo' trigger={['hover', 'focus']}>
              <PopoverNotification ref={notificationRef}>
                <BellOutlined className='bg-transparent  text-xl' style={{ color: 'var(--gt-primary-color)' }} />
              </PopoverNotification>
            </Tooltip>
          </>
        )}

        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement='bottomRight'
          arrow
          className='cursor-pointer leading-4'
        >
          <Link to='' onClick={(e) => e.preventDefault()} data-test-id='header-settings'>
            <Flex gap={8} align='center'>
              {/* <Avatar icon={<UserOutlined />} size='small' /> */}
              <Image
                src='default-avt.jpg'
                style={{
                  padding: 1,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '1px solid var(--gt-primary-color)'
                }}
                preview={false}
              />
              <div className='flex flex-col'>
                <span style={{ fontSize: '11px', marginBottom: '-4px' }}>
                  {currentUser?.fullName ?? 'Cán bộ trinh sát'}
                </span>
                <span style={{ fontSize: '9px', color: 'gray' }}>{currentUser?.positionName ?? 'Cán bộ'}</span>
              </div>
              <DownOutlined />
            </Flex>
          </Link>
        </Dropdown>
      </Flex>
      <ModalChangePassword
        open={openChangePassword}
        onClose={() => {
          setOpenChangePassword(false);
        }}
      />
      <ModalThongTinCaNhan
        open={openThongTinCaNhan}
        onClose={() => {
          setOpenThongTinCaNhan(false);
        }}
      />
    </>
  );
}

export default HeaderMenu;
