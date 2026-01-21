import { useEffect, useMemo, useRef, useState } from 'react';
import testingFile from '@/assets/documents/test-speed.pdf';
import { TrangThaiDuongTruyenInternet } from '@/constants/business/enums';
import { LOCAL_STORAGE } from '@/constants/common/map';
import Worker from '@/workers/downloadWorker?worker';

export default function useInternetSpeed(pollingMillisencondTimes = 90000) {
  const [downloadSpeed, setDownloadSpeed] = useState<Nullable<number>>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string>('');
  const intervalRef = useRef<any>(null);
  const workerRef = useRef<Nullable<Worker>>(null);

  const stopTestInternetSpeed = () => {
    if (!isStarted) return;
    setIsStarted(false);
    intervalRef.current && clearInterval(intervalRef.current);
    window.removeEventListener('offline', () => {});
  };

  const startTestInternetSpeed = () => {
    if (isStarted) return;
    setIsStarted(true);
    testInternetSpeed();
    intervalRef.current = setInterval(testInternetSpeed, pollingMillisencondTimes);
    window.addEventListener('offline', () => {
      localStorage.setItem(LOCAL_STORAGE.INTERNET_SPEED, TrangThaiDuongTruyenInternet.NoInternet);
      setError('Đường truyền không khả dụng');
    });
  };

  const testInternetSpeed = async () => {
    if (isTesting) return;
    try {
      setIsTesting(true);
      setError('');
      setDownloadSpeed(null);
      workerRef.current = new Worker();
      workerRef.current.postMessage({ fileUrl: testingFile });
      workerRef.current.onmessage = (e) => {
        setIsTesting(false);
        if (e.data.error) {
          throw new Error('Đường truyền không khả dụng');
        } else {
          setDownloadSpeed(e.data.speedInMbps);
          localStorage.setItem(LOCAL_STORAGE.INTERNET_SPEED, (e.data.speedInMbps || 0).toFixed(2));
          workerRef.current?.terminate();
        }
      };
    } catch (_) {
      setError('Đường truyền không khả dụng');
      localStorage.setItem(LOCAL_STORAGE.INTERNET_SPEED, TrangThaiDuongTruyenInternet.NoInternet);
    }
  };

  useEffect(() => {
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      window.removeEventListener('offline', () => {});
    };
  }, []);

  const testSpeed = useMemo(() => {
    if (error) return 'Mất kết nối đường truyền';
    let textTestSpeed = `Tốc độ tải xuống: ${(downloadSpeed || 0).toFixed(2)} MB/s`;
    if (isTesting) {
      textTestSpeed = `Tốc độ tải xuống: ...MB/s`;
    }
    return textTestSpeed;
  }, [downloadSpeed, isTesting, error]);

  return {
    internetSpeedDescription: testSpeed,
    internetSpeed: downloadSpeed,
    isInternetTesting: isTesting,
    error,
    reload: testInternetSpeed,
    startTestInternetSpeed,
    stopTestInternetSpeed,
    isStarted
  };
}
