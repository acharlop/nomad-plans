import FooterComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let myFilteredPlans

describe('FooterComponent', () => {
  beforeEach(() => {
    myFilteredPlans = jest.fn(() => [])

    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            mine: [],
            friends: [],
          },
          actions: {
            getPlans: jest.fn(),
          },
          getters: {
            myFilteredPlans,
          },
          mutations: {
            setConfirmationsFilters: jest.fn(),
          },
        },
      },
    }
  })
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(FooterComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof FooterComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof FooterComponent.data).toBe('function')
    // const defaultData = FooterComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(FooterComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(FooterComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
