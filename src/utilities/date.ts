import dayjs from 'dayjs';
import { getLastItemOfArr } from './object';

export const TIME_FORMAT = 'HH:mm';
export const TIME_FNS_FORMAT = 'h:mm';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const MONTH_FORMAT = 'MM/YYYY';
export const QUARTER_FORMAT = '[Q]Q/YYYY';
export const YEAR_FORMAT = 'YYYY';
export const MONTH_FORMAT_VALIDATE = ['MM/YYYY', 'M/YYYY'];
export const DATE_FORMAT_VALIDATE = ['DD/MM/YYYY', 'D/M/YYYY', 'D/MM/YYYY', 'DD/M/YYYY'];
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const DATE_FORMAT_HYPHEN = 'YYYY-MM-DD';
export const FULL_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const DATE_VALID_FORMAT = [YEAR_FORMAT, ...MONTH_FORMAT_VALIDATE, ...DATE_FORMAT_VALIDATE];

export function formatDate(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_FORMAT);
}

export function hyphenateDate(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_FORMAT_HYPHEN);
}

export function formatDateTime(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_TIME_FORMAT);
}

export function formatFullDateTime(date: dayjs.ConfigType): string {
  return dayjs(date).format(FULL_DATE_TIME_FORMAT);
}

export function formatTimeRangeWithEndDate(startDate: dayjs.ConfigType, endDate: dayjs.ConfigType): string {
  return `${formatTime(startDate)} - ${formatTime(endDate)} ${formatDate(endDate)}`;
}

export function formatTime(date: dayjs.ConfigType): string {
  return dayjs(date).format(TIME_FORMAT);
}
export function formatMonth(date: dayjs.ConfigType): string {
  return dayjs(date).format(MONTH_FORMAT);
}
export function formatYear(date: dayjs.ConfigType): string {
  return dayjs(date).format(YEAR_FORMAT);
}

export function formatISOString(date: dayjs.ConfigType): string {
  return dayjs(date).toISOString();
}

export function formatTimestamp(date: dayjs.ConfigType): number {
  return dayjs(date).valueOf();
}

export function mergeTime(source: dayjs.ConfigType, target: dayjs.ConfigType): string {
  const hour = dayjs(target).get('hour');
  const minute = dayjs(target).get('minute');
  const second = dayjs(target).get('second');

  return formatISOString(dayjs(source).hour(hour).minute(minute).second(second));
}

export function getDateRangeIsoFromDateRange(dateRange: dayjs.ConfigType[]) {
  return dateRange.map((item) => formatISOString(item));
}

export function getStartAndEndDateIsoFromDateRange(dateRange: dayjs.ConfigType[]) {
  return [
    formatISOString(dayjs(dateRange[0]).startOf('day')),
    formatISOString(dayjs(getLastItemOfArr(dateRange)).endOf('day'))
  ];
}

/**
 * Format return dd/mm/yyyy
 * @param dateRange
 * @returns
 */
export function getStartAndEndDateIsoFromDateRangeV2(dateRange: dayjs.ConfigType[]) {
  return [formatDate(dayjs(dateRange[0]).startOf('day')), formatDate(dayjs(getLastItemOfArr(dateRange)).endOf('day'))];
}

export function disabledFutureDate(value: dayjs.Dayjs) {
  return value.diff(dayjs().endOf('day')) >= 0;
}

export function disabledPastDate(value: dayjs.Dayjs) {
  return value.diff(dayjs().startOf('day')) < 0;
}

/**
 *
 * @param value string date in multiverse of madness
 * @returns {string}
 *
 *  eg:
 *  let value = 10-05-1995
 *
 *  transformDateSeperator(value)
 *  ==> 10/05/1995
 *
 *  let value = 05-1995
 *  transformDateSeperator(value)
 *  ==> 05/1995
 */
export function transformDateSeperator(value: string) {
  return value.replace(/[-.]/g, '/');
}
