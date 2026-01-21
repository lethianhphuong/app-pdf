import { unescape } from 'lodash';
import { FileTypeEnums } from '@/constants/business/enums';
import { REGEX_MIME_TYPE } from '@/constants/common/const';

export function bytesToMB(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export function MBToBytes(mb: number): number {
  return mb * 1024 * 1024;
}

export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result?.toString() || '';
      resolve(base64String);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export function base64ToText(base64: string) {
  const binString = atob(base64);
  const base64Bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
  return new TextDecoder().decode(base64Bytes);
}

export const ACCEPT_FILE_TYPE_INPUT =
  'image/*, .pdf, .docx, .xls, .xlsx, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export const ACCEPT_AUDIO_VIDEO_TYPE_INPUT = 'audio/mpeg, video/mp4';

export const ACCEPT_FILE_TYPE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/bmp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export const ACCEPT_AUDIO_AND_VIDEO_TYPE = ['video/mp4', 'audio/mpeg'];

export const ACCEPT_ARCHIVE_TYPE = ['application/x-zip-compressed'];

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

export const ACCEPT_FILE_TYPE_DOC = [
  '.docx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc',
  'application/msword'
];

export const ACCEPT_FILE_TYPE_PDF = ['.pdf', 'application/pdf'];

export const ACCEPT_FILE_TYPE_IMAGE = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];

export const ACCEPT_FILE_TYPE_EXCEL = [
  '.xls',
  '.xlsx',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export function getFileType(fileType: string): FileTypeEnums | undefined {
  const typeDoc = ACCEPT_FILE_TYPE_DOC.includes(fileType);
  const typePdf = ACCEPT_FILE_TYPE_PDF.includes(fileType);
  const typeExcel = ACCEPT_FILE_TYPE_EXCEL.includes(fileType);
  const typeImage = fileType?.split('/')[0] === 'image';
  const typeVideo = ACCEPT_AUDIO_AND_VIDEO_TYPE[0] === fileType;
  const typeAudio = ACCEPT_AUDIO_AND_VIDEO_TYPE[1] === fileType;

  if (typeDoc) return FileTypeEnums.Doc;
  if (typePdf) return FileTypeEnums.Pdf;
  if (typeExcel) return FileTypeEnums.Excel;
  if (typeImage) return FileTypeEnums.Image;
  if (typeVideo) return FileTypeEnums.Video;
  if (typeAudio) return FileTypeEnums.Audio;

  return undefined;
}

export function base64ToBlob(base64: string, contentType = '', sliceSize = 512, isLatin1 = true) {
  let byteCharacters = undefined;

  if (isLatin1) {
    byteCharacters = atob(base64);
  } else {
    const endcodedString = btoa(unescape(encodeURIComponent(base64)));
    byteCharacters = atob(endcodedString);
  }

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function getFileExtByType(type: FileTypeEnums): string {
  switch (type) {
    case FileTypeEnums.Audio:
      return '.mp3';
    case FileTypeEnums.Video:
      return '.mp4';
    case FileTypeEnums.Doc:
      return '.docx, .doc';
    case FileTypeEnums.Excel:
      return '.xlsx';
    case FileTypeEnums.Image:
      return 'ảnh';
    case FileTypeEnums.Pdf:
      return '.pdf';
    case FileTypeEnums.File:
    default:
      return '';
  }
}

export function getFileAcceptTypeByType(type: FileTypeEnums): string[] {
  switch (type) {
    case FileTypeEnums.Audio:
      return [ACCEPT_AUDIO_AND_VIDEO_TYPE[1]];
    case FileTypeEnums.Video:
      return [ACCEPT_AUDIO_AND_VIDEO_TYPE[0]];
    case FileTypeEnums.Doc:
      return ACCEPT_FILE_TYPE_DOC;
    case FileTypeEnums.Excel:
      return ACCEPT_FILE_TYPE_EXCEL;
    case FileTypeEnums.Image:
      return ['image/*'];
    case FileTypeEnums.Pdf:
      return ACCEPT_FILE_TYPE_PDF;
    case FileTypeEnums.File:
    default:
      return [];
  }
}

export const getMimeType = (value: string) => {
  const regexMimeType = REGEX_MIME_TYPE;
  return value.match(regexMimeType)?.[1];
};

export const downloadFileFromBase64 = (base64: string, mimeType: string, fileName: string) => {
  const blob = base64ToBlob(base64, mimeType);
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
