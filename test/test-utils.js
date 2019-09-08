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

// local view instance
const localVue = createLocalVue()

// attach real instances
localVue.use(VueRouter)
localVue.use(Vuex)

// routing
const router = new VueRouter()

// stubs
const stubs = ['router-link', 'router-view', 'nuxt', 'fa']

export const mount = (
  component,
  { options = {}, storeOptions = {}, vuetifyOptions = {} } = {}
) => {
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

export const shallow = (
  component,
  { options = {}, storeOptions = {}, vuetifyOptions = {} } = {}
) => {
  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  return vueShallowMount(component, {
    localVue,
    router,
    stubs,
    store,
    vuetify,
    ...options,
  })
}