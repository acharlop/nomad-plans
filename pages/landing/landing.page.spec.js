import { mount } from '@vue/test-utils'
import LandingPageComponent from './index.vue'

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('LandingPageComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LandingPageComponent)
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
