import { extend, isArray, isObject, isString, isFunction } from '@vue/shared'
import { isEqualWith } from 'lodash'
import { debugWarn } from './error'
export const SCOPE = 'Util'
export const isNumber = val => typeof val === 'number'
export const keysOf = arr => Object.keys(arr)
/**
 * @description 将长度为1的数组转化成对象
 * @param {Array} arr
 * @returns {Object}
 * @example
 * toObject([{name: 'zs'}]) => {name: 'zs'}
 */
export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
/**
 * @description 转移特殊字符
 * @param {*} value
 * @returns
 * @example
 * escapeRegexpString('<script>') => '<\script>'
 */
export const escapeRegexpString = (value = '') =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

/**
 * @description 判断是否为空
 * @param { Any } val
 * @returns
 * @example
 * isEmpty([]) => true
 * isEmpty({}) => true
 * isEmpty(() => {}) => false,
 */
export function isEmpty(val) {
  if (
    (!val && val !== 0) ||
    (isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  )
    return true

  return false
}
/**
 * @description 数组扁平化
 * @param {Array} arr
 * @returns {Array} 新的合并数组
 * @example
 * [{ name: '1' }, [{ name: '4' }, { name: '5' }]] => [{ name: '1' },{ name: '4' }, { name: '5' }]
 */
export function arrayFlat(arr) {
  return arr.reduce((acm, item) => {
    const val = Array.isArray(item) ? arrayFlat(item) : item
    return acm.concat(val)
  }, [])
}
/**
 * @description 重复数据消除
 * @param {Array} arr 原始数据
 * @returns  返回一个全新的过滤后的数组
 * @example
 * ['1','1','12'] => ['1','12']
 */
export function deduplicate(arr) {
  return Array.from(new Set(arr))
}
/**
 * @description 添加像素单位
 * @param { String|Number } value 具体的值
 * @returns
 * @example
 * addUnit(33) => '33px'
 */
export function addUnit(value) {
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return `${value}px`
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
  return ''
}

/**
 * @description 增强 `lodash.isEqual` 因为它总是返回 false，即使两个函数具有完全相同的语句
 * @param {*} obj 要比较的值
 * @param {*} other 要比较的另一个值
 * @returns 如果值相等，则返回 `true`，否则返回 `false`.
 * @example
 *  lodash.isEqual(() => 1, () => 1)      // false
 *  isEqualWith(() => 1, () => 1)         // true
 */
export function isEqualWithFunction(obj, other) {
  return isEqualWith(obj, other, (objVal, otherVal) => {
    return isFunction(objVal) && isFunction(otherVal)
      ? `${objVal}` === `${otherVal}`
      : undefined
  })
}
/**
 * @description 合并两个对象
 * @param { Object } a
 * @param { Object } b
 * @returns 全新合并后的对象
 * @example
 * merge({ name: '124' }, { name: '124', age: 44 }) => {name: '124', age: 44}
 */
export const merge = (a, b) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])]
  const obj = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
/**
 * @description 自动前缀生成器，css3
 * @param {*} style
 * @returns
 */
export const autoprefixer = function (style) {
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach((rule) => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach((prefix) => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}
/**
 * @description 根据属性获取URL的对应值
 * @param { String } name 属性名
 * @returns {String } 返回属性对应值
 * @example
 * http://xxxxx/index.html?id=10002545&type=student => getUrlParam ('id') => 10002545
 *
 */
export const getUrlParam = function (name) {
  let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.href.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return undefined
}

/**
 * @description 根据URL获取配置参数
 * @returns { Object } 返回处理好的配置参数
 * @example
 * http://xxx/index.html?id=10002545&type=student => getQueryUrl() => {id: "10002545", type: "student"}
 */
export function getQueryUrl() {
  let currentPageUrl = location.href
  if (!currentPageUrl.includes('?')) return {}
  let params = currentPageUrl.split('?')[1].split('&')
  let obj = {}
  params.map(v => (obj[v.split('=')[0]] = v.split('=')[1]))
  return obj
}
/**
 * @description 去除空格
 * @param { String } str 带去除值
 * @param { String|Number } type 去除的类型 默认是 1 【type: 1=>所有空格  2=>前后空格  3=>前空格 4=>后空格】
 * @returns {String} 处理以后的新值
 */
export const trim = function (str, type) {
  type = type || 1
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '')
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:
      return str.replace(/(^\s*)/g, '')
    case 4:
      return str.replace(/(\s*$)/g, '')
    default:
      return str
  }
}
