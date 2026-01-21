import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import GlobalOutlined from '@ant-design/icons/lib/icons/GlobalOutlined';
import { Switch } from 'antd';
import Draggable from 'react-draggable';
import { env } from '@/config/env';
import useInternetSpeed from '@/hooks/common/useInternetSpeed';
import { notification } from '@/staticAlert';

const HOTLINE_SUPPORT = env.SUPPORT_HOTLINE;

export default function Footer() {
  const {
    internetSpeedDescription,
    internetSpeed,
    error,
    reload,
    isInternetTesting,
    startTestInternetSpeed,
    stopTestInternetSpeed,
    isStarted
  } = useInternetSpeed();

  return (
    <>
      <div
        className='w-screen fixed'
        style={{ backgroundColor: 'var(--gt-background-layout)', height: 'var(--gt-footer-height)' }}
      >
        <div className='h-4 grid grid-cols-3'>
          <div className='col-start-2 col-span-1 flex h-4 items-end justify-center text-red-600'>
            Hotline hỗ trợ: {HOTLINE_SUPPORT}
          </div>
        </div>
      </div>

      <Draggable bounds='html'>
        <div
          style={{ zIndex: 9999 }}
          className={`fixed bottom-0 left-0 col-span-1 flex items-end justify-end cursor-move`}
        >
          <div
            className={`w-60 flex justify-between items-center py-1 px-2 rounded-xl text-xs ${((internetSpeed || 0) < 0.25 || error) && isStarted ? 'text-[var(--gt-error-color)] bg-[#fff1f0]' : 'text-[var(--gt-base-color)] bg-[var(--gt-header-grid-bg-color)]'}`}
            style={{ boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.4)' }}
          >
            <div className='flex items-center'>
              <GlobalOutlined className='mr-2' />
              {!isStarted ? 'Bật kiểm tra tốc độ tải xuống' : internetSpeedDescription}
            </div>

            <div className='flex items-center gap-2'>
              {isStarted && (
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    if (isInternetTesting) {
                      notification.warning({ message: 'Hành động đang được thực hiện' });
                      return;
                    }
                    reload();
                  }}
                >
                  {isInternetTesting ? <LoadingOutlined /> : <ReloadOutlined />}
                </span>
              )}
              <Switch
                className='ml-auto'
                checked={isStarted}
                size='small'
                onChange={(checked) => {
                  if (checked) {
                    startTestInternetSpeed();
                    return;
                  }
                  stopTestInternetSpeed();
                }}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
