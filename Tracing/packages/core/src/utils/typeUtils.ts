function isType(type: string) {
  const typeString = `[object ${type}]`;
  return (value: any): boolean => Object.prototype.toString.call(value) === typeString;
}

export const isRegExp = isType('RegExp');
export const isNumber = isType('Number');
export const isString = isType('String');
export const isBoolean = isType('Boolean');
export const isNull = isType('Null');
export const isUndefined = isType('Undefined');
export const isSymbol = isType('Symbol');
export const isFunction = isType('Function');
export const isObject = isType('Object');
export const isArray = isType('Array');
export const isProcess = isType('process');
export const isWindow = isType('Window');

export const isFalse = (val: any) => isBoolean(val) && !val;

/**
 * 检测变量类型
 */
export const variableTypeDetection = {
  isNumber,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isSymbol,
  isFunction,
  isObject,
  isArray,
  isProcess,
  isWindow
};

/**
 * 判断值是否为错误对象
 */
export function isError(error: any): boolean {
   return ['[object Error]', '[object Exception]', '[object DOMException]'].indexOf(Object.prototype.toString.call(error)) !== -1;
}

/**
 * 判断值是否为空对象
 */
export function isEmptyObject(obj: object): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

/**
 * 判断值是否为空 ['', undefined, null]
 */
export function isEmpty(wat: any): boolean {
  return isString(wat) ? wat.trim() === '' : wat === undefined || wat === null;
}

/**
 * 判断值与目标对象关系
 */
export function isExistProperty(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
