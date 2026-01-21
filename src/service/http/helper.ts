import { AxiosResponse } from 'axios';
import { notification } from '@/staticAlert';

export function joinTimestamp<T extends boolean>(join: boolean, restful: T): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.my-website.com', obj)
 *  ==>www.my-website.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function getFileNameFromResponse(response: AxiosResponse, defaultName = 'unknown'): string {
  const contentDisposition = response.headers['content-disposition'];
  let fileName = defaultName;
  if (contentDisposition) {
    const regex = /^.*filename[^;=\n]*=(([\\'"]).*?\2|[^;\n]*)[\n;]?$/i;
    const fileNameMatch = contentDisposition.match(regex);
    if (fileNameMatch?.length > 2) fileName = fileNameMatch[1];
  }
  return fileName;
}

export async function downloadByData(data: BlobPart, filename: string, saveAs = false) {
  const supportsShowSaveFilePicker = 'showSaveFilePicker' in window;

  if (saveAs && supportsShowSaveFilePicker) {
    await downLoadWithSaveAs(data, filename);
  } else {
    await downLoadWithSave(data, filename);
  }
}

async function downLoadWithSaveAs(data: BlobPart, filename: string) {
  try {
    const blob = new Blob([data]);

    const handler = await window.showSaveFilePicker({
      suggestedName: filename
    });

    const writable = await handler.createWritable();
    await writable.write(blob);
    await writable.close();

    notification.success({
      message: 'Tải file thành công !'
    });
  } catch (error: any) {
    if (error.name != 'AbortError') {
      // eslint-disable-next-line no-console
      console.error(error.name, error.message);
      notification.error({
        message: 'Tải file thất bại !'
      });
    }
  }
}

async function downLoadWithSave(data: BlobPart, filename: string) {
  const blobUrl = URL.createObjectURL(new Blob([data]));
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  a.style.display = 'none';
  document.body.append(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
    a.remove();
  }, 1000);
}

export function downloadWithUrl(url: string, fileName: string) {
  return new Promise((resolve) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    a.target = '_blank';
    document.body.append(a);

    // const handleFocus = () => {
    //   window.removeEventListener('focus', handleFocus);
    //   resolve(null);
    // };

    // window.addEventListener('focus', handleFocus);
    a.click();

    setTimeout(() => {
      a.remove();
      resolve(null);
    }, 1000);
  });
}
