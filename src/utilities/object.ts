import { cloneDeep, difference, intersection, isEqual, isNil, isObject, omitBy } from 'lodash';
import { isUndefined } from './typeof';

export function deepMerge<T = unknown>(source: any = {}, target: any = {}): T {
  const src = cloneDeep(source);
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) && src[key] !== null ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function deepCompare(obj1: any, obj2: any) {
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export const omitNil = <T extends object>(object: T) =>
  omitBy(object, (value: unknown) => isEqual(value, '') || isNil(value)) as T;

export const transformOptionToArr = <T extends { value: any; label: any }>(object: T) => {
  return typeof object === 'object' && !Array.isArray(object)
    ? ([object.value, object.label] as [T['value'], T['label']])
    : [];
};

/**
 *
 * @param obj Object
 * @returns objectArray Array
 *
 *  eg 1:
 *  const person = { 'name': 'nguyen van a', 'age': '18'}
 *
 *  transformObjToArr(person)
 *  ==>['name: nguyen van a', 'age: 18']
 *
 *  eg 2:
 *  const person = { 'name': '', 'age': '18'}
 *
 *  transformObjToArr(person)
 *  ==>['age: 18']
 */
export function transformObjToArr(obj: { [x: string]: string | number | undefined }) {
  return Object.entries(obj).reduce((arr: string[], item: [string, string | number | undefined]) => {
    const value = getLastItemOfArr(item);
    return value ? arr.concat(item.join(': ')) : arr;
  }, []);
}

export const getLastItemOfArr = <T>(arr: T[]) => {
  return arr.at(-1) as T;
};

export const isLastItemOfArr = <T>(arr: T[], index: number): boolean => {
  return index === arr.length - 1;
};

export const isOnlyOneItemInArr = <T>(arr: T[]): boolean => {
  return arr.length === 1;
};

export const findIndexInArr = <T>(arr: T[], condition: (item: T) => boolean): number | undefined => {
  const foundIndex = arr.findIndex(condition);
  if (isUndefined(foundIndex) || foundIndex === -1) return;

  return foundIndex;
};

export const isSubArray = <T>(child: T[], parent: T[]) => difference(child, parent).length === 0;

export const hasCommon = <T>(array1: T[], array2: T[]) => intersection(array1, array2).length > 0;
