import AppBarComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

describe('AppBarComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            user: {
              photoUrl: '',
              name: '',
              email: '',
            },
          },
          getters: {},
        },
        layout: {
          namespaced: true,
          state: {
            showSideDrawer: true,
          },
        },
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(AppBarComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof AppBarComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof AppBarComponent.data).toBe('function')
    // const defaultData = AppBarComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(AppBarComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(AppBarComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
