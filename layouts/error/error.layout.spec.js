import ErrorLayoutComponent from '../error.vue'
import { mount } from '@/test/test-utils'

import AppBar from '@/components/layout/app-bar'

let storeOptions
let propsData

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
        code: 400,
      },
    }
  })

  test('is Vue component', () => {
    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  xtest('correct 404 error', () => {
    propsData.error.code = 404

    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })
    expect(wrapper.vm.errorTitle).toEqual("This page doesn't exist")
  })

  test('correct 500 error', () => {
    propsData.error.code = 500

    const wrapper = mount(ErrorLayoutComponent, {
      storeOptions,
      propsData,
    })

    expect(wrapper.vm.errorTitle).toEqual('Sorry, an error occurred')
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
