import components from './vuecode.vue'

const Vuecode = {
  install(Vue, options) {
    Vue.component('vuecode', components)

    Vue.prototype.$vcoptions = options || {}
  }
}

export default Vuecode
