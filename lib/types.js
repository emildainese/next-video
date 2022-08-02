export const isObject = (val) =>
  typeof val === 'object' && val instanceof Object && val !== null;

export const isString = (val) =>
  typeof val === 'string' &&
  Object.prototype.toString.call(val) === '[object String]';

export const isNumber = (val) =>
  typeof val === 'number' &&
  Object.prototype.toString.call(val) === '[object Number]';

export const isArray = (val) =>
  val instanceof Array &&
  Object.prototype.toString.call(val) === '[object Array]';
