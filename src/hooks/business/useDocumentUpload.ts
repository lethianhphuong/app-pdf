import { useCallback, useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import useStateRef from 'react-usestateref';
import { useTus } from 'use-tus';
import { MAX_CHUNK_SIZE_BYTES } from '@/constants/common/const';
import { LOCAL_STORAGE } from '@/constants/common/map';
import { useAppDispatch, useAsyncEffect } from '@/hooks';
import { editorUrl } from '@/service';
import { notification } from '@/staticAlert';
import { clear, push, remove as removeFromStore, update, updateStatus } from '@/store/slices/documentUpload';

export default function useDocumentUpload<T>({
  onUploadDone,
  onUploadError,
  onUploadCancel
}: {
  onUploadDone?: (uploadedIds: string[], otherParams?: T) => Promise<void>;
  onUploadError?: (otherParams?: T) => Promise<void>;
  onUploadCancel?: (otherParams?: T) => Promise<void>;
}) {
  const { setUpload, error, isUploading, upload, remove } = useTus({
    autoStart: false
  });

  const authCode = useMemo(() => localStorage.getItem(LOCAL_STORAGE.AUTH_CODE), [localStorage]);
  const accessToken = useMemo(() => localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN), [localStorage]);
  const [listFile, setListFile] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File>();
  const [, setCurrentFileId, currentFileIdRef] = useStateRef<string>();
  const [, setCurrentFileInfo, currentFileInfoRef] = useStateRef<Object>();
  const [uploadedIds, setUploadedIds] = useState<string[]>([]);
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [params, setParams] = useState<any>();
  const dispatch = useAppDispatch();
  const [isRetrying, setIsRetrying] = useState(false);

  const cancelUpload = useCallback(async () => {
    try {
      await upload?.abort();
      remove();
      onUploadCancel && (await onUploadCancel(params));
      setUploadedIds([]);
      setIsUploadDone(false);
      setParams(undefined);
      setListFile([]);
      dispatch(removeFromStore({ document: { id: currentFileIdRef?.current } }));
      setCurrentFile(undefined);
      setCurrentFileId(undefined);
      setCurrentFileInfo(undefined);
    } catch (_) {
      //
    }
  }, [setUploadedIds, setIsUploadDone, setParams, setListFile, setCurrentFile, upload, remove, params]);

  const startUpload = useCallback(
    (files: File[], otherParams?: T) => {
      otherParams && !params && setParams(otherParams);
      setListFile(files);
      setIsUploadDone(false);
    },
    [setUpload, authCode, accessToken]
  );

  useEffect(() => {
    if (isRetrying) return;
    if (!listFile.length) return;
    if (listFile.length && uploadedIds.length && listFile.length === uploadedIds.length) {
      setIsUploadDone(true);
      return;
    }
    setCurrentFile(listFile[uploadedIds.length]);

    const fileInfo = params?.listData
      ? params?.listData?.[uploadedIds.length]?.moreInfo
      : { trichYeu: params?.trichYeu || params?.name || params?.maBieuMau };

    setCurrentFileInfo(fileInfo);
    setCurrentFileId(nanoid(6));
  }, [listFile, uploadedIds]);

  useEffect(() => {
    if (!currentFile) return;
    handleUploadSingleFile(currentFile);
    dispatch(
      push({
        documents: [
          {
            name: (currentFileInfoRef?.current as any)?.trichYeu,
            id: currentFileIdRef?.current,
            progress: 0
          }
        ]
      })
    );
  }, [currentFile]);

  useEffect(() => {
    if (!upload) {
      return;
    }

    upload.start();
  }, [upload]);

  const handleUploadSingleFile = useCallback(
    (file: File) => {
      setUpload(file, {
        endpoint: `${editorUrl}/document/upload`,
        chunkSize: MAX_CHUNK_SIZE_BYTES,
        headers: {
          Authcode: authCode as string,
          Authorization: accessToken as string
        },
        metadata: {
          filename: file.name,
          filetype: file.type
        },
        onBeforeRequest: () => {},
        onProgress: (bytesSent, bytesTotal, _u) => {
          dispatch(
            update({
              document: {
                id: currentFileIdRef?.current,
                progress: Number(((bytesSent / bytesTotal) * 100).toFixed(2))
              }
            })
          );
        },
        onAfterResponse(_req, res) {
          const uploadedId = res.getBody();
          if (uploadedId) {
            setUploadedIds((prev) => [...prev, uploadedId]);
          }
        },
        onError: (error) => {
          dispatch(
            updateStatus({
              document: {
                id: currentFileIdRef?.current,
                status: 'exception'
              }
            })
          );
          // eslint-disable-next-line no-console
          console.log('`error` >>:', error);
          notification.error({ message: 'Cập nhật tài liệu thất bại, vui lòng thử lại!!!' });
          setUploadedIds([]);
          setIsUploadDone(false);
          setParams(undefined);
          setListFile([]);
          setCurrentFile(undefined);
          setCurrentFileId(undefined);
          setCurrentFileInfo(undefined);
          onUploadError && onUploadError();
        },
        onShouldRetry: (_, retryAttempt: number) => {
          setIsRetrying(retryAttempt <= 3);
          return retryAttempt <= 3;
        }
      });
    },
    [authCode, accessToken, setUpload, setUploadedIds, onUploadError, setListFile]
  );

  useAsyncEffect(async () => {
    if (isUploading || !isUploadDone || error) return;
    try {
      onUploadDone && (await onUploadDone(uploadedIds, params));
      setTimeout(() => {
        dispatch(clear());
      }, 1000);
    } catch (_) {
      //
    } finally {
      setUploadedIds([]);
      setIsUploadDone(false);
      setParams(undefined);
      setListFile([]);
      setCurrentFile(undefined);
      setCurrentFileId(undefined);
      setCurrentFileInfo(undefined);
    }
  }, [isUploading, isUploadDone, error, params]);

  return {
    startUpload,
    cancelUpload
  };
}
