import { ReactNode } from 'react';
import { UploadFile } from 'antd';

export interface UploadFilesProps {
  children: ReactNode;
  fileList: UploadFile[];
  setFileList: React.Dispatch<UploadFile[]>;
  maxCount?: number;
  maxSizeMB?: number;
  fileType?: string[];
}
