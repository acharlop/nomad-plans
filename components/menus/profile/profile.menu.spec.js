import ProfileMenuComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

describe('ProfileMenuComponent', () => {
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
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(ProfileMenuComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof ProfileMenuComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof ProfileMenuComponent.data).toBe('function')
    // const defaultData = ProfileMenuComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(ProfileMenuComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(ProfileMenuComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
