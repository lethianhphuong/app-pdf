import * as tus from 'tus-js-client';

interface UploadRequest {
  file: File;
  id: string;
  endpoint: string;
  metadata: Record<string, any>;
  accessToken: string;
  authCode: string;
}

interface UploadWorkerRequest {
  type: 'START_UPLOAD' | 'PAUSE_UPLOAD' | 'RESUME_UPLOAD' | 'CANCEL_UPLOAD';
  payload: UploadRequest;
}

const uploads = new Map();

self.onmessage = function (e: MessageEvent<UploadWorkerRequest>) {
  const { type, payload } = e.data;

  switch (type) {
    case 'START_UPLOAD':
      startUpload(payload);
      break;
    case 'PAUSE_UPLOAD':
      pauseUpload(payload.id);
      break;
    case 'RESUME_UPLOAD':
      resumeUpload(payload.id);
      break;
    case 'CANCEL_UPLOAD':
      cancelUpload(payload.id);
      break;
    default:
      break;
  }
};

function startUpload({ file, id, endpoint, metadata, accessToken, authCode }: UploadRequest) {
  if (!authCode && !accessToken) return;

  const upload = new tus.Upload(file, {
    endpoint: endpoint,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      filename: file.name,
      filetype: file.type,
      ...metadata
    },
    headers: {
      Authcode: authCode as string,
      Authorization: accessToken as string
    },
    chunkSize: 1 * 1024 * 1024, //1MB chunks,

    onError(error) {
      self.postMessage({
        type: 'UPLOAD_ERROR',
        payload: { id, error: error.message }
      });
    },

    onSuccess() {
      self.postMessage({
        type: 'UPLOAD_COMPLETE',
        payload: { id, url: upload.url }
      });
      uploads.delete(id);
    },

    onProgress(bytesUploaded: number, bytesTotal: number) {
      const progess = Math.round((bytesUploaded / bytesTotal) * 100);

      const speed = caculateSpeed(id, bytesUploaded);

      const remainingTime = caculateRemainingTime(speed, bytesTotal - bytesUploaded);

      self.postMessage({
        type: 'UPLOAD_PROGRESS',
        payload: {
          id,
          progess,
          uploadedBytes: bytesUploaded,
          totalBytes: bytesTotal,
          speed,
          remainingTime
        }
      });
    }
  });

  uploads.set(id, {
    upload,
    startTime: Date.now(),
    lastBytesUploaded: 0,
    lastTime: Date.now()
  });

  upload.start();
}

function pauseUpload(id: string) {
  const uploadData = uploads.get(id);
  if (!uploadData) return;
  uploadData.upload.abort();
  self.postMessage({
    type: 'UPLOAD_PAUSED',
    payload: { id }
  });
}

function resumeUpload(id: string) {
  const uploadData = uploads.get(id);
  if (!uploadData) return;
  uploadData.upload.start();
  self.postMessage({
    type: 'UPLOAD_RESUMED',
    payload: { id }
  });
}

function cancelUpload(id: string) {
  const uploadData = uploads.get(id);
  if (!uploadData) return;
  uploadData.upload.abort(true);
  uploads.delete(id);
  self.postMessage({
    type: 'UPLOAD_CANCELLED',
    payload: { id }
  });
}

function caculateSpeed(id: string, currentBytes: number) {
  const uploadData = uploads.get(id);
  if (!uploadData) return 0;
  const now = Date.now();
  const timeDiff = now - uploadData.lastTime;
  const bytesDiff = currentBytes - uploadData.lastBytesUploaded;

  if (timeDiff > 1000) {
    uploadData.lastTime = now;
    uploadData.lastBytesUploaded = currentBytes;
    return bytesDiff / (timeDiff / 1000);
  }

  return 0;
}

function caculateRemainingTime(speed: number, remainingBytes: number) {
  if (speed === 0) return 0;
  return Math.round(remainingBytes / speed);
}
