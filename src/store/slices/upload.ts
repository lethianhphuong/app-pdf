import { createSlice } from '@reduxjs/toolkit';
import { UPLOAD_MANAGER } from '../config';
import { RootState } from '../reducer';

export const UPLOAD_STATUS = {
  PENDING: 'pending',
  UPLOADING: 'uploading',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ERROR: 'error',
  CANCELLED: 'cancelled'
};

type UploadStatus = 'pending' | 'uploading' | 'paused' | 'completed' | 'error' | 'cancelled';

export interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  speed: number;
  remainingTime: number;
  error?: null;
  startTime: number;
  uploadedBytes: number;
  totalBytes: number;
  url?: string;
}
const uploadSlice = createSlice({
  name: UPLOAD_MANAGER,
  initialState: {
    uploads: new Map<string, UploadItem>(),
    totalProgress: 0,
    isUploading: false
  },
  reducers: {
    addUpload: (state, action) => {
      const { file, id } = action.payload;
      state.uploads.set(id, {
        id,
        file,
        progress: 0,
        status: 'pending',
        speed: 0,
        remainingTime: 0,
        error: null,
        startTime: Date.now(),
        uploadedBytes: 0,
        totalBytes: file.size,
        url: undefined
      });
      state.isUploading = true;
    },
    updateProgress: (state, action) => {
      const { id, progess, uploadedBytes, speed, remainingTime } = action.payload;
      const upload = state.uploads.get(id);
      if (upload) {
        upload.progress = progess;
        upload.uploadedBytes = uploadedBytes;
        upload.speed = speed;
        upload.remainingTime = remainingTime;
        upload.status = 'uploading';
      }

      let totalProgress = 0;
      let activeUploads = 0;
      state.uploads.forEach((upload) => {
        if (upload.status !== 'cancelled') {
          totalProgress += upload.progress;
          activeUploads++;
        }
      });
      state.totalProgress = activeUploads > 0 ? totalProgress / activeUploads : 0;
    },
    completeUpload: (state, action) => {
      const { id, url } = action.payload;
      const upload = state.uploads.get(id);
      if (upload) {
        upload.status = 'completed';
        upload.progress = 100;
        upload.url = url;
      }

      //check if all uploads are complete
      const uploadItems = Array.from(state.uploads.values());
      const hasActiveUploads = uploadItems.some(
        (upload) => upload.status === 'uploading' || upload.status === 'pending'
      );
      state.isUploading = hasActiveUploads;
    },
    pauseUpload: (state, action) => {
      const { id } = action.payload;
      const upload = state.uploads.get(id);
      if (!upload) return;
      upload.status = 'paused';
    },
    resumeUpload: (state, action) => {
      const { id } = action.payload;
      const upload = state.uploads.get(id);
      if (upload) {
        upload.status = 'uploading';
      }
      state.isUploading = true;
    },
    errorUpload: (state, action) => {
      const { id, error } = action.payload;
      const upload = state.uploads.get(id);
      if (!upload) return;
      upload.status = 'error';
      upload.error = error;
    },
    cancelUpload: (state, action) => {
      const { id } = action.payload;
      const upload = state.uploads.get(id);
      if (upload) {
        upload.status = 'cancelled';
      }

      //if all uploads are cancelled or complete
      const uploadItems = Array.from(state.uploads.values());
      const hasActiveUploads = uploadItems.some(
        (upload) => upload.status === 'uploading' || upload.status === 'pending'
      );
      state.isUploading = hasActiveUploads;
    },
    removeUpload: (state, action) => {
      const { id } = action.payload;
      state.uploads.delete(id);
    },
    clearCompleteUploads: (state) => {
      state.uploads.forEach((upload, id) => {
        if (upload.status === UPLOAD_STATUS.COMPLETED) state.uploads.delete(id);
      });
    }
  }
});

export const {
  addUpload,
  updateProgress,
  completeUpload,
  pauseUpload,
  resumeUpload,
  errorUpload,
  cancelUpload,
  removeUpload,
  clearCompleteUploads
} = uploadSlice.actions;

export const uploadStore = (state: RootState) => state[UPLOAD_MANAGER];
export default uploadSlice.reducer;
