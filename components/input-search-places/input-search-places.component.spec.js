import InputSearchPlacesComponentComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('InputSearchPlacesComponentComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(InputSearchPlacesComponentComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof InputSearchPlacesComponentComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof InputSearchPlacesComponentComponent.data).toBe('function')
    // const defaultData = InputSearchPlacesComponentComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(InputSearchPlacesComponentComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(InputSearchPlacesComponentComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
