import { isArray, isObject } from './types';

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

export const skipKeyByValue = (obj, value, keysToSkip) => {
  const key = getKeyByValue(obj, value);
  return keysToSkip.some((k) => k === key);
};

export const skipKey = (keys) => (obj) => {
  if (isArray(obj)) {
    return Object.keys(obj[0]).filter((key) => !keys.some((k) => k === key));
  } else if (isObject(obj)) {
    return Object.keys(obj).filter((key) => !keys.some((k) => k === key));
  }
};
