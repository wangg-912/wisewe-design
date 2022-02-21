import { getCurrentInstance } from 'vue'
/**
 * get globalOptions $WISEWE config object
 */
export function useGlobalOptions() {
  const instance = getCurrentInstance()

  if (!instance) {
    console.warn('useGlobalOptions must be call in setup function')
    return
  }

  return instance.appContext.config.globalProperties.$WISEWE || {}
}

export function setupGlobalOptions(opts = {}) {
  return (app) => {
    app.config.globalProperties.$WISEWE = {
      size: opts.size || ''
    }
  }
}