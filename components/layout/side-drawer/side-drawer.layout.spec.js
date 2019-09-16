import SideDrawerLayoutComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

describe('SideDrawerLayoutComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        layout: {
          state: {
            showSideDrawer: true,
            sideDrawerTab: 'mine',
          },
          mutations: {
            toggleSideDrawer: jest.fn(),
            toggleSideDrawerTab: jest.fn(),
          },
        },
        plans: {
          namespaced: true,
          state: {
            mine: [],
            friends: [],
          },
          actions: {
            getPlans: jest.fn(),
          },
        },
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(SideDrawerLayoutComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof SideDrawerLayoutComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof SideDrawerLayoutComponent.data).toBe('function')
    // const defaultData = SideDrawerLayoutComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(SideDrawerLayoutComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(SideDrawerLayoutComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
