import { isArray } from 'lodash';

/**
 *
 * @param str origin
 * @returns {string}
 *  eg:
 *  let str = 'Tiếng việt có dấu'
 *  removeVietnameseAccents(str)
 *  ==>'Tieng viet co dau'
 */
export const removeVietnameseAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const removeVietNameseSentences = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  return str;
};

/**
 *
 * @param stringSource origin
 * @param chunkSize split size
 * @param startSize first split size
 * @returns {string[]}
 *
 *  eg:
 *  let stringSource = 101002003006
 *
 *  cutStringIntoChunks(stringSource, 3)
 *  ==>[101, 101002, 101002003, 101002003006]
 *
 *  cutStringIntoChunks(stringSource, 3, 6)
 *  ==>[101002, 101002003, 101002003006]
 */
export const cutStringAndStackIncrease = (
  stringSource: string = '',
  chunkSize: number,
  startSize?: number
): string[] => {
  const target: string[] = [];
  for (let i = startSize || chunkSize; i <= stringSource.length; i += chunkSize) {
    target.push(stringSource.substring(0, i));
  }

  return target;
};

export const toCapitalize = (stringSource: string): string => {
  const stringArr = stringSource.split(' ');
  return stringArr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
};

export const isUsingUriEncoded = (text: string): boolean => {
  try {
    decodeURIComponent(text);
    return true;
  } catch (_) {
    return false;
  }
};

export const isStringifiedArray = (str: string): boolean => {
  try {
    const parsed = JSON.parse(str);
    return isArray(parsed);
  } catch (_) {
    return false;
  }
};
