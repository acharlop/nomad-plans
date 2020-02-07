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
const stubs = ['router-link', 'router-view', 'nuxt', 'fa', 'GmapAutocomplete']

export const mount = (
  component,
  { options = {}, storeOptions = {}, vuetifyOptions = {}, propsData = {} } = {}
) => {
  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  document.body.setAttribute('data-app', true)

  return vueMount(component, {
    localVue,
    router,
    stubs,
    store,
    vuetify,
    propsData,
    ...options,
  })
}

export const shallow = (
  component,
  { options = {}, storeOptions = {}, vuetifyOptions = {}, propsData = {} } = {}
) => {
  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  document.body.setAttribute('data-app', true)

  return vueShallowMount(component, {
    localVue,
    router,
    stubs,
    store,
    vuetify,
    propsData,
    ...options,
  })
}
