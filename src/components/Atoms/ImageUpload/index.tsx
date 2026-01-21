import React, { ReactNode, useEffect, useState } from 'react';
import { Form, FormInstance, GetProp, Input, Upload, UploadProps, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { now } from 'lodash';
import './style.less';
import { importImage } from '@/utilities/image';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface BaseImageUploadProps extends Omit<UploadProps, 'name'> {
  name: string | number | (string | number)[];
  hiddenName?: string | number | (string | number)[];
  label: ReactNode;
  maxSize?: number;
  thumbUrl?: string;
  form: FormInstance<any>;
}

export const ImageUpload: React.FC<BaseImageUploadProps> = ({
  name,
  hiddenName,
  form,
  thumbUrl,
  maxSize,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>('');

  const validate = (file: FileType, maxSize?: number): { pass: boolean; message: string } => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      return { pass: false, message: 'Ảnh không đúng định dạng JPG hoặc PNG!' };
    }
    if (maxSize && file.size / 1024 / 1024 > maxSize) {
      return { pass: false, message: `Ảnh không được vượt quá ${maxSize}MB!` };
    }
    return { pass: true, message: '' };
  };

  const beforeCrop = (file: FileType, maxSize?: number) => {
    const checkValidate = validate(file, maxSize);
    if (checkValidate.message.length > 0) {
      message.error(checkValidate.message);
    }
    return checkValidate.pass;
  };

  const beforeUpload = (file: FileType, maxSize?: number) => {
    const checkValidate = validate(file, maxSize);
    if (!checkValidate.pass) {
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result?.toString());
      form.setFieldValue(name, reader.result?.toString());
      hiddenName && form.setFieldValue(hiddenName, now().toString());
    };

    return false;
  };

  useEffect(() => {
    // if (thumbUrl) {
    setImageUrl(thumbUrl);
    // }
  }, [thumbUrl]);

  return (
    <>
      <ImgCrop quality={1} beforeCrop={(file) => beforeCrop(file, maxSize)}>
        <Upload
          className='gt-image-upload h-full'
          accept='image/*'
          maxCount={1}
          listType='picture-card'
          showUploadList={false}
          beforeUpload={(file) => beforeUpload(file, maxSize)}
          {...props}
        >
          <div
            className='w-full pt-[100%] bg-cover bg-no-repeat bg-center'
            style={{ backgroundImage: `url("${imageUrl || importImage('/img/avatar.jpg')}")` }}
          ></div>
        </Upload>
      </ImgCrop>
      <Form.Item name={name} hidden>
        <Input />
      </Form.Item>
      {hiddenName && (
        <Form.Item name={hiddenName} hidden>
          <Input />
        </Form.Item>
      )}
    </>
  );
};
