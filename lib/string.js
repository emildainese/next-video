import { isArray, isString } from './types';

export const shorten = (str, len) =>
  str.length <= len ? str : str.substring(0, len) + '...';

export const ucfirst = (str) => {
  if (isString(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else if (isArray(str)) {
    return str.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  }
};

export const splitUpper = (str) => {
  if (isString(str)) {
    return str.split(/(?=[A-Z])/g).join(' ');
  } else if (isArray(str)) {
    return str.map((s) => s.split(/(?=[A-Z])/g).join(' '));
  }
};

export const ucFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitToUcfist = (str) =>
  str
    .split(/(?=[A-Z])/g)
    .map((token) => ucfirst(token))
    .join(' ');
