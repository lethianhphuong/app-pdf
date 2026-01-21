import { useEffect, useState } from 'react';
import { Form, Image, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { FileTypeEnums } from '@/constants/business/enums';
import { getFileAcceptTypeByType } from '@/utilities/file';
import { ruleFileType, ruleMaxFileSize } from '@/utilities/form/rules/common';
import { importImage } from '@/utilities/image';

interface ImageUploadProps {
  className?: string;
  defaultImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ className, defaultImage }) => {
  const maxFileSizeMB = 10;
  const form = Form.useFormInstance();
  const imageFile = Form.useWatch(['conNguoi', 'anhDtBase64'], form);
  const [imageUrl, setImageUrl] = useState(importImage('/img/avatar.jpg'));
  const allowFileTypes = [FileTypeEnums.Image];

  useEffect(() => {
    if (!imageFile) {
      setImageUrl(importImage('/img/avatar.jpg'));
      return;
    }
    setImageUrl(imageFile?.fileList?.[0]?.url);
  }, [imageFile, defaultImage]);

  useEffect(() => {
    if (!defaultImage) return;
    setImageUrl(defaultImage);
    form.setFieldValue(['conNguoi', 'anhDtBase64'], {
      fileList: [{ uid: nanoid(6), url: defaultImage, type: 'image/png' }]
    });
  }, [defaultImage]);

  function beforeUpload(file: RcFile) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      form.setFieldValue(['conNguoi', 'anhDtBase64'], {
        fileList: [{ uid: file.uid, type: file.type, url: reader.result }]
      });
    };
    return false;
  }

  return (
    <Form.Item
      className='mb-0'
      name={['conNguoi', 'anhDtBase64']}
      rules={[ruleFileType(allowFileTypes), ruleMaxFileSize(maxFileSizeMB)]}
    >
      {/* <ImgCrop rotationSlider quality={1} beforeCrop={beforeCrop}> */}
      <Upload
        fileList={imageFile?.fileList}
        showUploadList={false}
        maxCount={1}
        multiple={false}
        beforeUpload={beforeUpload}
        className={classNames('cursor-pointer gt-image-upload', className)}
        listType='picture-card'
        accept={allowFileTypes.map((item) => getFileAcceptTypeByType(item)).join(',')}
      >
        <Image src={imageUrl} loading='lazy' className='object-cover' preview={false} />
      </Upload>
      {/* </ImgCrop> */}
    </Form.Item>
  );
};
