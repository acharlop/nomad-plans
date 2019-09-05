import { mount } from '@vue/test-utils'
import DefaultLayoutComponent from '../default'

describe('LandingLayoutComponent', () => {
  // is Vue instance
  test('is a Vue instance', () => {
    const wrapper = mount(DefaultLayoutComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  it('has a created hook', () => {
    // expect(typeof LandingLayoutComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    // expect(typeof LandingLayoutComponent.data).toBe('function')
    // const defaultData = LandingLayoutComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    // const vm = new Vue(LandingLayoutComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  it('renders the correct message', () => {
    // const Ctor = Vue.extend(LandingLayoutComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
