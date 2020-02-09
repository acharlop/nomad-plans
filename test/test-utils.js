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
localVue.use(Vuex)

// routing
const router = new VueRouter()

// stubs
const stubs = [
  'router-link',
  'router-view',
  'nuxt',
  'nuxt-link',
  'fa',
  'GmapAutocomplete',
]

export const mount = (
  component,
  {
    options = {},
    storeOptions = {},
    vuetifyOptions = {},
    propsData = {},
    mocks = {},
    mockRouter = true,
  } = {}
) => {
  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  document.body.setAttribute('data-app', true)

  if (mockRouter) {
    options = { ...options, router }
  }

  return vueMount(component, {
    localVue,
    stubs,
    store,
    vuetify,
    mocks,
    propsData,
    ...options,
  })
}

export const shallow = (
  component,
  {
    options = {},
    storeOptions = {},
    vuetifyOptions = {},
    propsData = {},
    mocks = {},
    mockRouter = true,
  } = {}
) => {
  const store = new Vuex.Store(storeOptions)

  const vuetify = new Vuetify({
    mocks: {
      $vuetify: vuetifyOptions,
    },
  })

  document.body.setAttribute('data-app', true)

  if (mockRouter) {
    options = { ...options, router }
  }

  return vueShallowMount(component, {
    localVue,
    stubs,
    store,
    vuetify,
    propsData,
    mocks,
    ...options,
  })
}
