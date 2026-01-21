import { combineReducers } from '@reduxjs/toolkit';
import {
  AUTH_MANAGER,
  DANH_MUC_MANAGER,
  DIRTY_MANAGER,
  DOCUMENT_UPLOAD_MANAGER,
  LOADING_MANAGER,
  UPLOAD_MANAGER
} from './config';
import authReducer from './slices/auth';
import danhMucReducer from './slices/danhMuc';
import dirtyReducer from './slices/dirty';
import documentUploadReducer from './slices/documentUpload';
import loadingReducer from './slices/loading';
import uploadReducer from './slices/upload';

const rootReducer = combineReducers({
  [AUTH_MANAGER]: authReducer,
  [LOADING_MANAGER]: loadingReducer,
  [DANH_MUC_MANAGER]: danhMucReducer,
  [DIRTY_MANAGER]: dirtyReducer,
  [DOCUMENT_UPLOAD_MANAGER]: documentUploadReducer,
  [UPLOAD_MANAGER]: uploadReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
