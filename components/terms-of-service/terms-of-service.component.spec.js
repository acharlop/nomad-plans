import { mount } from '@vue/test-utils'
import TermsOfServiceComponentComponent from './index.vue'

describe('TermsOfServiceComponentComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(TermsOfServiceComponentComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  it('has a created hook', () => {
    // expect(typeof TermsOfServiceComponentComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    // expect(typeof TermsOfServiceComponentComponent.data).toBe('function')
    // const defaultData = TermsOfServiceComponentComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    // const vm = new Vue(TermsOfServiceComponentComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  it('renders the correct message', () => {
    // const Ctor = Vue.extend(TermsOfServiceComponentComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
