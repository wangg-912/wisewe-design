/**
 * @description 错误类
 */
class ElementPlusError extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'ElementPlusError'
  }
}
/**
 * @description 错误抛出机制
 * @param { String } scope
 * @param { String} msg
 */
export function throwError(scope, msg) {
  throw new ElementPlusError(`[${scope}] ${msg}`)
}
/**
 * @description 断点警告
 * @param { String } scope
 * @param { String } message
 */
export function debugWarn(scope, message) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(new ElementPlusError(`[${scope}] ${message}`))
  }
}
