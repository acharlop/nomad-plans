import LoginPageComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

jest.mock('@/components/auth-button', () => () => 'AuthButton')

describe('LoginPageComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            isNewUser: false,
          },
          mutations: {
            toggleNewUser: jest.fn(),
          },
        },
      },
    }
  })

  // is Vue instance
  test('is a Vue instance', () => {
    const wrapper = mount(LoginPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
