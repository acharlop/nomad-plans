import LandingPageComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

describe('LandingPageComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        auth: {
          state: {},
          actions: {
            'auth/signInAutomatic': jest.fn().mockReturnValue(),
            'auth/signInWithFacebook': jest.fn().mockReturnValue(),
          },
          getters: {},
        },
      },
    }
  })

  // is Vue instance
  test('is a Vue instance', () => {
    const wrapper = mount(LandingPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof LandingPageComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof LandingPageComponent.data).toBe('function')
    // const defaultData = LandingPageComponent.data();
    // expect(defaultData.message).toBe('hello!');
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
