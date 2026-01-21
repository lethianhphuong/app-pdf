import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';
import { FileTypeEnums } from '@/constants/business/enums';
import {
  REGEXP_PHONE,
  REGEX_CMND_CCCD,
  REGEX_NO_SPECIAL_CHARACTER,
  REGEX_NUMBER,
  REGEX_NUMBER_OR_CHAR,
  REGEX_ONLY_NUMBER_AND_ALPHABET_CHARACTER_AND_WHITE_SPACE_WITHIN
} from '@/constants/common/const';
import {
  DATE_FORMAT_VALIDATE,
  DATE_VALID_FORMAT,
  MONTH_FORMAT_VALIDATE,
  YEAR_FORMAT,
  disabledFutureDate,
  transformDateSeperator
} from '@/utilities/date';
import { MBToBytes, getFileExtByType, getFileType } from '@/utilities/file';
import { isArray, isNull, isObject } from '@/utilities/typeof';

export interface LabelInValue {
  label: string | number;
  value: string | number;
}

export function isLabelInValueMode<T extends LabelInValue>(value: T | unknown): value is T {
  return isObject(value) && !isNull(value) && 'value' in value && 'label' in value;
}

export const ruleRequired: Rule = {
  validator(_rule, value) {
    let hasValue = false;
    if (isLabelInValueMode(value)) {
      hasValue = !!value.value;
    } else if (isArray(value)) {
      hasValue = value.some((item) => !!item);
    } else {
      hasValue = !!value;
    }

    return hasValue ? Promise.resolve() : Promise.reject();
  },
  message: 'Không được để trống trường này!'
};

export const ruleMinLength = (minLength: number): Rule => ({
  min: minLength,
  message: `Tối thiểu ${minLength} ký tự!`
});

export const ruleMaxLength = (maxLength: number): Rule => ({
  max: maxLength,
  message: `Tối đa ${maxLength} ký tự!`
});

export const ruleNoSpecialCharacter: Rule = {
  type: 'string',
  pattern: REGEX_NO_SPECIAL_CHARACTER,
  message: 'Không được nhập ký tự đặc biệt!'
};

export const ruleOnlyAlphabet: Rule = {
  type: 'string',
  pattern: REGEX_ONLY_NUMBER_AND_ALPHABET_CHARACTER_AND_WHITE_SPACE_WITHIN,
  message: 'Không được nhập ký tự đặc biệt!'
};

export const ruleNumberOrCharacter: Rule = {
  type: 'string',
  pattern: REGEX_NUMBER_OR_CHAR,
  message: 'Chỉ được nhập chữ hoặc số!'
};

export const ruleNumber: Rule = {
  type: 'string',
  pattern: REGEX_NUMBER,
  message: 'Chỉ được nhập số!'
};

export const ruleCmnnOrCccd: Rule = {
  type: 'string',
  pattern: REGEX_CMND_CCCD,
  message: 'CMND/CCCD Chỉ gồm 9 hoặc 12 chữ số!'
};

export const ruleSoDienThoai: Rule = {
  type: 'string',
  pattern: REGEXP_PHONE,
  message: 'Số điện thoại không đúng định dạng'
};

export const ruleNgaySinh: Rule = {
  validator: (_, val) => {
    if (!val) return Promise.resolve();
    const transformDate = dayjs(transformDateSeperator(val), DATE_VALID_FORMAT, true);
    const isValidDate = transformDate.isValid();
    if (!isValidDate) return Promise.reject('Không đúng định dạng ngày hoặc tháng hoặc năm!');

    const isFutureDate = disabledFutureDate(transformDate);
    if (isFutureDate) return Promise.reject('Không được lớn hơn ngày tháng năm hiện tại!');

    return Promise.resolve();
  }
};

export const ruleKhoangThoiGianFormat: Rule = {
  validator(_rule, value?: string) {
    if (!value) return Promise.resolve();

    const isTuNgayDenNgayFormat = value.includes('đến');
    if (!isTuNgayDenNgayFormat) {
      const transformDate = dayjs(transformDateSeperator(value), DATE_VALID_FORMAT, true);
      const isValid = transformDate.isValid();
      return isValid ? Promise.resolve() : Promise.reject();
    }

    const [, tuNgay, , denNgay] = value.split(' ');
    const transformTuNgay = dayjs(transformDateSeperator(tuNgay), DATE_VALID_FORMAT, true);
    const transformDenNgay = dayjs(transformDateSeperator(denNgay), DATE_VALID_FORMAT, true);
    const isValidDate = transformTuNgay.isValid() && transformDenNgay.isValid();
    return isValidDate ? Promise.resolve() : Promise.reject();
  },
  message: 'Không đúng định dạng ngày hoặc từ ngày đến ngày!'
};

export const getDayMonthYearFromString = (dateString: string) => {
  const transformDate = transformDateSeperator(dateString);

  const patterns = [
    { regex: /^(\d{4})$/, extract: ([, year]: any[]) => ({ day: null, month: null, year }) },
    { regex: /^(\d{1,2})\/(\d{4})$/, extract: ([, month, year]: any[]) => ({ day: null, month, year }) },
    { regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, extract: ([, day, month, year]: any[]) => ({ day, month, year }) }
  ];

  for (const { regex, extract } of patterns) {
    const match = transformDate.match(regex);
    if (match) {
      const { day, month, year } = extract(match);
      return {
        day: day ? dayjs(day, 'D').format('D') : null,
        month: month ? dayjs(month, 'M').format('M') : null,
        year: year ? dayjs(year, 'YYYY').format('YYYY') : null
      };
    }
  }

  return { day: null, month: null, year: null };
};

export const ruleKhoangThoiGianNotAllowFutureDate: Rule = {
  validator(_rule, value?: string) {
    if (!value) return Promise.resolve();

    const isTuNgayDenNgayFormat = value.includes('đến');
    if (!isTuNgayDenNgayFormat) {
      const transformDate = dayjs(transformDateSeperator(value), DATE_VALID_FORMAT, true);
      const isFuture = transformDate.diff(dayjs().endOf('day')) >= 0;
      return isFuture ? Promise.reject() : Promise.resolve();
    }

    const [, tuNgay, , denNgay] = value.split(' ');
    const transformTuNgay = dayjs(transformDateSeperator(tuNgay), DATE_VALID_FORMAT, true);
    const transformDenNgay = dayjs(transformDateSeperator(denNgay), DATE_VALID_FORMAT, true);
    const isFutureDate =
      transformTuNgay.diff(dayjs().endOf('day')) >= 0 || transformDenNgay.diff(dayjs().endOf('day')) >= 0;
    return isFutureDate ? Promise.reject() : Promise.resolve();
  },
  message: 'Không được lớn hơn ngày hiện tại!'
};

export const ruleKhoangThoiGianTuNgayNhoHonDenNgay: Rule = {
  validator(_rule, value?: string) {
    if (!value) return Promise.resolve();

    const isTuNgayDenNgayFormat = value.includes('đến');
    if (!isTuNgayDenNgayFormat) return Promise.resolve();

    const [, tuNgay, , denNgay] = value.split(' ');
    const transformTuNgay = dayjs(transformDateSeperator(tuNgay), DATE_VALID_FORMAT, true);
    const transformDenNgay = dayjs(transformDateSeperator(denNgay), DATE_VALID_FORMAT, true);
    const isTuNgayNhoHonDenNgay = transformTuNgay.diff(transformDenNgay) <= 0;

    return isTuNgayNhoHonDenNgay ? Promise.resolve() : Promise.reject();
  },
  message: 'Từ ngày phải nhỏ hơn đến ngày!'
};

/**Validate maximum file size upload
 * @param {number} maxFileSize - The maximum file upload size allow (by MB)
 */
export const ruleMaxFileSize = (maxFileSize: number): Rule => ({
  validator(_rule, value) {
    const file = value?.fileList?.[0];
    if (!file) return Promise.resolve();

    const maxFileSizeToBytes = MBToBytes(maxFileSize);

    const isUploadable = (value?.fileList as File[])?.every((item) => {
      const fileSize = item?.size || 0;
      return fileSize <= maxFileSizeToBytes;
    });

    return isUploadable ? Promise.resolve() : Promise.reject();
  },
  message: `Hỗ trợ upload file kích thước tối đa ${maxFileSize} MB`
});

/**Validate extension of file  upload
 * @param {FileTypeEnums} typeArr - list of allow file extensions
 */
export const ruleFileType = (typeArr: FileTypeEnums[]): Rule => ({
  validator(_rule, value) {
    const file = value?.fileList?.[0];
    if (!file) return Promise.resolve();

    const fileType = getFileType(file?.type as string) as FileTypeEnums;

    return typeArr.includes(fileType) ? Promise.resolve() : Promise.reject();
  },
  message: `Chỉ hỗ trợ định dạng ${typeArr.map((item) => getFileExtByType(item)).join(', ')}`
});

export const generateRequiredRules = (required: boolean, rules: Rule[] | undefined): Rule[] => {
  const newRules = rules ? [...rules] : [];
  if (required && newRules.filter((item) => 'required' in item).length === 0) {
    newRules.push(ruleRequired);
  }
  return newRules;
};

export const validateStringAsDateNotAllowFutureDate: Rule = {
  validator(_rule, date) {
    const value = transformDateSeperator(date);

    const namSinh = dayjs(value, YEAR_FORMAT, true);
    const onlyNamSinh = namSinh?.isValid();

    const onlyThangSinhVaNamSinhFormat = MONTH_FORMAT_VALIDATE.find((format) => dayjs(value, format, true)?.isValid());

    const fullNgayThangNamSinhFormat = DATE_FORMAT_VALIDATE.find((format) => dayjs(value, format, true)?.isValid());

    if (onlyNamSinh) {
      return namSinh?.diff(dayjs()) <= 0 ? Promise.resolve() : Promise.reject();
    }

    if (onlyThangSinhVaNamSinhFormat) {
      const thangSinhVaNamSinh = dayjs(value, onlyThangSinhVaNamSinhFormat, true);
      return thangSinhVaNamSinh?.diff(dayjs()) <= 0 ? Promise.resolve() : Promise.reject();
    }

    if (fullNgayThangNamSinhFormat) {
      const ngayThangNamSinh = dayjs(value, fullNgayThangNamSinhFormat, true);
      return ngayThangNamSinh?.diff(dayjs()) <= 0 ? Promise.resolve() : Promise.reject();
    }

    return Promise.resolve();
  },
  message: 'Không được lớn hơn ngày hiện tại!'
};
