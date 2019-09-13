import MainLayoutComponent from '../main'
import { shallow } from '@/test/test-utils'

let storeOptions

describe('MainLayoutComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        layout: {
          namespaced: true,
          state: {
            dialogs: {
              legal: false,
              invite: false,
              planForm: false,
            },
          },
          getters: {},
        },
      },
    }
  })

  // is Vue instance
  test('is Vue instance', async () => {
    const wrapper = await shallow(MainLayoutComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  it('has a created hook', () => {
    // expect(typeof MainLayoutComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    // expect(typeof MainLayoutComponent.data).toBe('function')
    // const defaultData = MainLayoutComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    // const vm = new Vue(MainLayoutComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  it('renders the correct message', () => {
    // const Ctor = Vue.extend(MainLayoutComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
