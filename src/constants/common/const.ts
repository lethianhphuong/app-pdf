/**
 * Lưu các constants dùng chung cho tất cả các phần mềm
 */
import { PAGE_SIZE } from '@/utilities/pagination';

/**
 * Mẫu const
 */
export const DATE_FORMAT_COMMON_SAMPLE = 'DD/MM/YYYY';

//#region BASE64
export const BG_IMAGE_STATISTIC_YELLOW_BASE64 =
  'data:image/jpeg;base64,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';

export const BG_IMAGE_STATISTIC_GREEN_BASE64 =
  'data:image/jpeg;base64,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';

export const BG_IMAGE_STATISTIC_BLUE_BASE64 =
  'data:image/jpeg;base64,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';
//#endregion

//#region REGEX
/** Mobile phone number regularization */
export const REGEXP_PHONE = /(?<!\d)0\d{9}(?!\d)/g;
/// /(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|088|091|094|070|079|076|078|090|093|089|056|058|092|059|099])+([0-9]{7})/;
/** Email regex */
export const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
/** Password regularity (the password is at least 8 to 20 digits/characters/symbols and must have a uppercase, one number, and symbols  ) */

export const REGEXP_PWD = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;
/** 6-digit verification code is regular */

export const REGEXP_CODE_SIX = /^\d{6}$/;
/** 4-digit verification code is regular */

export const REGEXP_CODE_FOUR = /^\d{4}$/;
/** url link regular */

export const REGEXP_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+( ?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+ ~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const REGEXP_VIETNAMESE =
  /^[A-Za-z0-9 _aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/;

export const REGEXP_CURRENCY = /^\d+(\.(\d+)?)?$/;

export const REGEXP_LINE_BREAK = /\n/g;

export const REGEXP_LOCATION = /^\d{1,3}(?:\.\d{1,8})?$/;

export const REGEX_POSITIVE_INTEGER = /^[1-9]\d*$/;

export const REGEX_NUMBER = /^\d+(\.\d+)?$/;

export const REGEX_NO_SPECIAL_CHARACTER = /^[^`~!@#$%^*]+$/;
/**
 * Date format DD/MM/YYYY or MM/YYYY or YYYY
 */

export const REGEX_DATE = /^(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$|^(\d{2}-){0,1}(\d{2}-){0,1}\d{4}$/;

export const REGEX_DATE_RANGE =
  /^(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$|^Từ\s(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}\sđến\s(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$/i;

export const REGEX_CMND_CCCD = /^\d{9}(\d{3})?$/;

export const REGEX_NUMBER_OR_CHAR = /[A-Za-z0-9]+$/;

export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const REGEX_UPPER_LOWER_CASE = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

export const REGEX_NUMBER_SPECIAL_CHAR = /^(?=.*\d)(?=.*[\W_]).+$/;

export const REGEX_QUAN_LY_PATHNAME = /quan-ly(?!.*quan-ly)/;

export const REGEX_NUMBER_FORMAT = /\B(?=(\d{3})+(?!\d))/g;

export const REGEX_NUMBER_PARSER = /\$\s?|(,*)/g;

export const REGEX_DECIMAL_NUMBER_PARSER = /\./g;

export const REGEX_ALPHABET_CHARACTER_AND_SPECIAL_CHARACTER = /^[A-Za-z^!@#$%^&*()_+=[\]{};':",.|`~<>/?\\]$/;

export const REGEX_ONLY_NUMBER_AND_ALPHABET_CHARACTER_AND_WHITE_SPACE_WITHIN =
  /^[A-Za-zÀ-ỹ0-9]+(?: +[A-Za-zÀ-ỹ0-9]+)*$/;
// a file name can't contain any of the following characters: \/:*?"<>|~
// eslint-disable-next-line no-control-regex

export const REGEX_MIME_TYPE = /data:([^;]+);base64,/;
//#endregion

export const SCHEDULE_ON_STATUS = '1';

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const STATUS = {
  SUCCESS: '200'
};

export const MAX_CHUNK_SIZE_BYTES = 2500000; //2.5mb

export const DEFAULT_PAGE_PARAMS = {
  page: 1,
  size: PAGE_SIZE,
  sort: ['ngayTao,desc']
};
