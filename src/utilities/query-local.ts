// @ts-nocheck
import { cloneDeep, isFunction } from 'lodash';
import { isArray, isBoolean, isObject, isString, isUndefined } from './typeof';

export interface LocalQueryParams {
  page?: number;
  size?: number;
  sort?: string[];
  [key: string]: any;
}

interface CustomCondition<T> {
  value: any;
  searchCondition: (value: any, item: T) => boolean;
}

function _instanceOfCustomCondition<T>(obj: any): obj is CustomCondition<T> {
  return isObject(obj) && !isUndefined(obj.value) && isFunction(obj.searchCondition);
}

export function localQuery<T>(list: T[], req?: Partial<T> & LocalQueryParams): { content: T[]; totalElements: number } {
  let data = cloneDeep(list);
  let limit = data.length;
  let offset = 0;

  let sortProp: string[] = [''];

  if (req) {
    const { page, size, sort, ...rest } = req;
    if (sort) {
      sortProp = sort;
    }
    if (size) {
      limit = size;
    }
    if (page) {
      offset = page * limit;
    }
    if (rest) {
      data = _searchByParams(list, rest);
    }
  }

  const { start, end } = _paginate(offset, limit, data);

  if (sortProp && sortProp.length > 0) {
    data = _orderBy(data, sortProp);
  }

  const records = data.slice(start, end);

  return {
    content: records,
    totalElements: data.length
  };
}

function _searchByParams<T>(list: T[], query: Recordable<any>) {
  const filter = (item: T) => {
    let allFound = true; // Are all conditions met
    for (const field of Object.keys(query)) {
      const fieldValue = query[field];
      const itemValue = item[field];

      if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
        // nothing
      } else if (_instanceOfCustomCondition(fieldValue)) {
        // If the value in the condition is a custom condition
        if (!fieldValue.searchCondition(fieldValue.value, item)) {
          allFound = false;
        }
      } else if (isArray(fieldValue)) {
        // If the value in the condition is an array, just find one
        const matched = _searchByArray(fieldValue, item, field);
        if (!matched) {
          allFound = false;
        }
      } else if (isObject(fieldValue)) {
        // If the value in the condition is an object, each key needs to match
        const matched = _searchByObject(fieldValue, item, field);
        if (!matched) {
          allFound = false;
        }
      } else if (isBoolean(fieldValue)) {
        if (itemValue !== fieldValue) {
          allFound = false;
        }
      } else if (!itemValue.toString().trim().toLowerCase().includes(fieldValue.toString().trim().toLowerCase())) {
        allFound = false;
      }
    }

    return allFound;
  };
  return list.filter(filter);
}

function _searchByArray<T>(fieldValues: any[], item: T, field: string) {
  if (fieldValues.length === 0) {
    return true;
  }
  let matched = false;
  for (const fieldValue of fieldValues) {
    if (item[field] instanceof Array) {
      for (const itemValue of item[field]) {
        if (fieldValue === itemValue) {
          matched = true;
          break;
        }
      }
      if (matched) {
        break;
      }
    } else if (item[field] === fieldValue || (isString(item[field]) && item[field].indexOf(`${fieldValue}`) >= 0)) {
      matched = true;
      break;
    }
    if (matched) {
      break;
    }
  }
  return matched;
}

function _searchByObject<T>(fieldValue: any, item: T, field: string) {
  let matched = true;
  for (const childField of Object.keys(fieldValue)) {
    const value = fieldValue[childField];
    if (value && item[field] && value !== item[field][childField]) {
      matched = false;
      break;
    }
  }
  return matched;
}

function _paginate<T>(offset: number, limit: number, data: T[]) {
  const start = offset;
  let end = offset + limit;
  if (data.length < end) {
    end = data.length;
  }
  return { start, end };
}

function _orderBy<T>(list: T[], sort: string[]) {
  const data = cloneDeep(list);
  sort.forEach((sort) => {
    // to sort
    data.sort((a, b) => {
      let ret = 0;
      const [field, order] = sort.split(',');
      if (a[field] > b[field]) {
        ret = 1;
      }
      if (a[field] < b[field]) {
        ret = -1;
      }
      return order === 'asc' ? ret : -ret;
    });
  });
  return data;
}
