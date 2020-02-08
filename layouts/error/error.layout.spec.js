import ErrorLayoutComponent from '../error.vue'
import { mount } from '@/test/test-utils'

import AppBar from '@/components/layout/app-bar'

const { location: originalLocation } = window

let storeOptions
let propsData
let replace

describe('ErrorLayoutComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            isAuthenticated: false,
            user: {
              photoUrl: '',
              name: '',
              email: '',
            },
          },
        },
        layout: {
          namespaced: true,
          state: {
            showSideDrawer: true,
          },
        },
      },
    }

    propsData = {
      error: {
        statusCode: 500,
      },
    }

    replace = jest.fn()
    window.location.replace = replace
  })

  afterAll(() => {
    window.location = originalLocation
  })

  test('is Vue component', () => {
    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('correct 404 error', () => {
    propsData.error.statusCode = 404

    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })
    expect(wrapper.find('h1').text()).toEqual("This page doesn't exist")
  })

  test('correct 500 error', () => {
    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })

    expect(wrapper.find('h1').text()).toEqual('Sorry, an error occurred')
  })

  test('reloads', () => {
    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })

    wrapper.find('button').trigger('click')

    expect(replace).toHaveBeenCalledWith('/')
  })

  test('display app bar if authenticated', () => {
    storeOptions.modules.auth.state.isAuthenticated = true

    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })

    expect(wrapper.contains(AppBar)).toBeTruthy()
  })
})
