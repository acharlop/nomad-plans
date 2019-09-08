import AuthButtonComponentComponent from './index.vue'
import { shallow } from '@/test/test-utils'

let storeOptions

describe('AuthButtonComponentComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            isNewUser: false,
            isAuthenticated: false,
          },
          actions: {
            signInAutomatic: jest.fn().mockReturnValue(),
            signInWithFacebook: jest.fn().mockReturnValue(),
            signOut: jest.fn().mockReturnValue(),
          },
          getters: {},
        },
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = shallow(AuthButtonComponentComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof AuthButtonComponentComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof AuthButtonComponentComponent.data).toBe('function')
    // const defaultData = AuthButtonComponentComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(AuthButtonComponentComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(AuthButtonComponentComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
