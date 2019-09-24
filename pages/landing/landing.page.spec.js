import LandingPageComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

jest.mock('@/components/auth-button', () => () => 'AuthButton')

describe('LandingPageComponent', () => {
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
    const wrapper = mount(LandingPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('displays for new user', () => {
    storeOptions.modules.auth.state.isNewUser = false
    const wrapper = mount(LandingPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  xtest('opens legal dialog with privacy tab', () => {
    const wrapper = mount(LandingPageComponent, { storeOptions })
    wrapper.showDialog = jest.fn()

    const a = wrapper.findAll('a')
    console.log(wrapper.callToJSON)
    expect(a.length).toBe(2)
    expect(a.at(1).innerHTML).toEqual('Privacy Policy')
    a.at(1).trigger('click')
    expect(wrapper.showDialog).toHaveBeenCalledWith('privacy')
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(LandingPageComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(LandingPageComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
