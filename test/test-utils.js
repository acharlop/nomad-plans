// Libraries
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Utilities
import {
  mount as vueMount,
  shallowMount as vueShallowMount,
  createLocalVue,
} from '@vue/test-utils'

export const mount = (
  component,
  { options = {}, storeOptions = {}, vuetifyOptions = {} } = {}
) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)

  const router = new VueRouter()

  const stubs = ['router-link', 'router-view', 'nuxt']

  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  return vueMount(component, {
    localVue,
    router,
    stubs,
    store,
    vuetify,
    ...options,
  })
}

export const shallow = (component, options, vuetifyOptions = {}) => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  return vueShallowMount(component, { localVue, vuetify, ...options })
}
