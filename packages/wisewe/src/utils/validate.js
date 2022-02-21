import {
  extend,
  hasOwn,
  isArray,
  isObject,
  isString,
  isFunction,
  isPromise,
  toRawType,
} from '@vue/shared'
export { hasOwn, extend, isObject, isArray, isString, isFunction, isPromise }

export const isBool = val => typeof val === 'boolean'

export const isHTMLElement = val => toRawType(val).startsWith('HTML')

export function isUndefined(val) {
  return val === undefined
}
