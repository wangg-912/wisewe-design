import { WlButton } from './components/Button'

import { version } from '../package.json'
import { setupGlobalOptions } from './hooks/useGlobalConfig'

const components = [WlButton]

const install = (app, opts = {}) => {
  app.use(setupGlobalOptions(opts))

  components.forEach((component) => {
    app.use(component)
  })
}
const wisewe = {
    version,
    install
  }

export { version, WlButton, install, setupGlobalOptions }
export * from './directives'
export * from './hooks'
export * from './utils'
export default wisewe
