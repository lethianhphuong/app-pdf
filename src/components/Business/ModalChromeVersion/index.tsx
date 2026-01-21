import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Button, DraggableModal } from '@/components/Atoms';
import { env } from '@/config/env';
import { LOCAL_STORAGE } from '@/constants/common/map';
import useAccountLogin from '@/hooks/business/useAccountLogin';

const getBrowserInfo = (): { browserName?: string; browserVersion?: string } => {
  const userAgent = navigator.userAgent;

  if (/chrome|crios|crmo/i.test(userAgent) && !/edg/i.test(userAgent)) {
    const browserName = 'Google Chrome';
    const browserVersion = userAgent.match(/(?:chrome|crios|crmo)\/(\d+)/i)?.[1];
    return { browserName, browserVersion };
  }

  if (/edg/i.test(userAgent)) {
    const browserName = 'Microsoft Edge';
    const browserVersion = userAgent.match(/edg\/(\d+)/i)?.[1];
    return { browserName, browserVersion };
  }

  if (/firefox|fxios/i.test(userAgent)) {
    const browserName = 'Mozilla Firefox';
    const browserVersion = userAgent.match(/(?:firefox|fxios)\/(\d+)/i)?.[1];
    return { browserName, browserVersion };
  }

  if (/safari/i.test(userAgent) && !/chrome|crios|crmo|fxios|edg/i.test(userAgent)) {
    const browserName = 'Apple Safari';
    const browserVersion = userAgent.match(/version\/(\d+)/i)?.[1];
    return { browserName, browserVersion };
  }

  if (/msie|trident/i.test(userAgent)) {
    const browserName = 'Internet Explorer';
    const browserVersion = userAgent.match(/(?:msie |rv:)\/(\d+)/i)?.[1];
    return { browserName, browserVersion };
  }

  return { browserName: undefined, browserVersion: undefined };
};

function ModalChromeVersion() {
  const [name, setName] = useState<string>();
  const [version, setVersion] = useState<string>();
  const minimumVersion = Number(env.MINIMUM_CHROME_VERSION);
  const [isCompatible, setIsCompatible] = useState(true);
  const checkedBrowser: string | null = localStorage.getItem(LOCAL_STORAGE.CHECKED_BROWSER);
  const checkedUsers: string[] = checkedBrowser ? JSON.parse(checkedBrowser) : [];
  const [open, setOpen] = useState(false);
  const [showAgain, setShowAgain] = useState(true);
  const { currentUser } = useAccountLogin();

  useEffect(() => {
    const { browserName, browserVersion } = getBrowserInfo();

    setName(browserName);
    setVersion(browserVersion);

    const stableVersion = browserVersion?.split('.')?.[0];

    if (!browserName) return;

    if (browserName === 'Google Chrome' && Number(stableVersion) >= minimumVersion) return;

    setIsCompatible(false);
  }, []);

  useEffect(() => {
    if (!currentUser || isCompatible) return;
    if (checkedUsers.includes(currentUser.id)) return;
    setOpen(true);
  }, [isCompatible, currentUser]);

  return (
    <DraggableModal
      title='Khuyến nghị'
      open={open}
      zIndex={999999999999999}
      onCancel={() => setOpen(false)}
      footer={[
        <Button
          style={{ marginInlineStart: 0 }}
          key='submit'
          type='primary'
          onClick={() => {
            if (!showAgain) {
              localStorage.setItem(LOCAL_STORAGE.CHECKED_BROWSER, JSON.stringify([...checkedUsers, currentUser?.id]));
            }
            setOpen(false);
          }}
        >
          Đã hiểu
        </Button>
      ]}
      destroyOnClose
    >
      <div style={{ height: '160px' }} className='overflow-auto'>
        <p>
          Để đảm bảo tương thích đầy đủ với phần mềm, vui lòng sử dụng{' '}
          <b>Google Chrome phiên bản {minimumVersion} trở lên</b>
        </p>
        <p className='m-0'>Trình duyệt hiện tại: {name}</p>
        <p className='m-0'>Phiên bản: {version}</p>

        <p>
          Tải và cài đặt Google Chrome <a href={env.FILE_URL_CHROME}>tại đây</a>
        </p>
      </div>
      <Checkbox
        className='mt-2'
        onChange={(props) => {
          setShowAgain(!props?.target?.checked);
        }}
      >
        Không hiển thị lại
      </Checkbox>
    </DraggableModal>
  );
}

export default ModalChromeVersion;
