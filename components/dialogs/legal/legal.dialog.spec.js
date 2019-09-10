import { mount } from '@vue/test-utils'
import LegalDialogComponent from './index.vue'

describe('LegalDialogComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(LegalDialogComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof LegalDialogComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof LegalDialogComponent.data).toBe('function')
    // const defaultData = LegalDialogComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(LegalDialogComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(LegalDialogComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
