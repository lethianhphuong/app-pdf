import React, { useEffect, useState } from 'react';
import { Upload, UploadFile } from 'antd';
import { UploadFilesProps } from './types';
import { notification } from '@/staticAlert';
import { ACCEPT_FILE_TYPE, ACCEPT_FILE_TYPE_INPUT, MBToBytes } from '@/utilities/file';

const UploadFiles: React.FC<UploadFilesProps> = ({ children, ...props }) => {
  const { fileList, setFileList, maxCount, maxSizeMB, fileType } = props;
  const [lstFileType, setLstFileType] = useState<string[]>([]);

  const onSelectFile = ({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) => {
    if (lstFileType?.length > 0) {
      if (!lstFileType.includes(file.type as string)) {
        notification.error({
          message: 'Lỗi',
          description: `Chỉ hỗ trợ các file có định dạng ${fileType?.join(', ')}!`,
          placement: 'topRight'
        });
        return;
      }
    } else {
      if (!ACCEPT_FILE_TYPE.includes(file.type as string)) {
        notification.error({
          message: 'Lỗi',
          description: 'Chỉ hỗ trợ định dạng ảnh, .docx và .pdf!',
          placement: 'topRight'
        });
        return;
      }
    }
    if (maxSizeMB) {
      if (file.size && file.size > MBToBytes(maxSizeMB)) {
        notification.error({
          message: 'Lỗi',
          description: `Chỉ được up file có dung lượng tối đa ${maxSizeMB} MB!`,
          placement: 'topRight'
        });
        return;
      }
    }

    setFileList(fileList);
  };

  useEffect(() => {
    if (fileType && fileType?.length > 0) {
      const lstAcceptFileType = ACCEPT_FILE_TYPE.filter((item) => !!fileType.find((x) => item.includes(x)));
      setLstFileType(lstAcceptFileType);
    }
  }, [fileType]);

  return (
    <>
      <Upload
        maxCount={maxCount}
        multiple={maxCount !== 1}
        beforeUpload={() => {
          return false;
        }}
        accept={lstFileType?.length > 0 ? lstFileType.join(', ') : ACCEPT_FILE_TYPE_INPUT}
        onChange={onSelectFile}
        fileList={fileList}
      >
        {(!maxCount || fileList.length < maxCount) && (
          <>
            <span className='cursor-pointer font-bold text-[var(--gt-primary-color)]'>{children}</span>
            {fileType && fileType?.length > 0 && (
              <span style={{ fontStyle: 'italic', fontSize: '12px' }}> (Định dạng: {fileType?.join(', ')})</span>
            )}
          </>
        )}
      </Upload>
    </>
  );
};

export default UploadFiles;
