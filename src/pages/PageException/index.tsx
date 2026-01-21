import { Typography } from 'antd';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import LoadComponentFallback from '@/components/Atoms/LoadComponentFallback';
import { env } from '@/config/env';
import { useLocation } from '@/hooks/common/useLocation';
import useLoadingStore from '@/store/zustand/useLoadingStore';

export default function PageException({ notFound }: { notFound?: boolean }) {
  const authLoading = useLoadingStore((state) => state.authLoading);

  const { query } = useLocation();

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 499) {
      return (
        <>
          <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
            <Typography.Title style={{ color: 'white' }}>
              499: Dịch vụ đang bị chặn bởi phần mềm diệt virus, xin vui lòng tải lại trang
            </Typography.Title>
          </div>
        </>
      );
    }

    if (error.status === 404) {
      return (
        <>
          <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
            <Typography.Title style={{ color: 'white' }}>Yêu cầu hết hạn, xin vui lòng tải lại trang</Typography.Title>
          </div>
        </>
      );
    }
  }

  if (authLoading) {
    return <LoadComponentFallback />;
  }

  if (query?.authority === 'notPermit') {
    return (
      <>
        <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
          <Typography.Title style={{ color: 'white' }}>Không có quyền</Typography.Title>
        </div>
      </>
    );
  }

  if (notFound) {
    return (
      <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
        <Typography.Title style={{ color: 'white' }}>Đường dẫn không hợp lệ!</Typography.Title>
      </div>
    );
  }

  if ((error as any)?.message?.includes('Failed to fetch dynamically imported module')) {
    return (
      <>
        <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
          <Typography.Title style={{ color: 'white' }}>Vui lòng tải lại trang</Typography.Title>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center flex-col'>
        <Typography.Title style={{ color: 'white' }}>{'Tính năng đang phát triển'}</Typography.Title>
        <div>
          <Typography.Text style={{ color: 'gray' }}>
            Nếu trình duyệt của bạn đã cũ, Vui lòng tải trình duyệt Chrome mới{' '}
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                window.open(env.FILE_URL_CHROME);
              }}
            >
              Tại đây
            </a>
          </Typography.Text>
        </div>
      </div>
    </>
  );
}
