import WlButton from './src/Button.vue'

WlButton.install = function (app) {
  app.component(WlButton.name, WlButton)
}

export { WlButton }