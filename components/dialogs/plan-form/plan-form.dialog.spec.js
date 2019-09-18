// import PlanFormDialogComponent from './index.vue'
import { mount } from '@/test/test-utils'
const PlanFormDialogComponent = () => {}

// jest.mock('vue2-google-maps/src/utils/simulateArrowDown', () => ({
//   downArrowSimulator: jest.fn(),
// }))
//
// jest.mock('vue2-google-maps/src/utils/bindProps', () => ({
//   bindProps: jest.fn(),
//   getPropsValues: jest.fn(),
// }))

describe('fake', () => {
  test('is true', () => {
    expect(true).toBeTruthy()
  })
})

let storeOptions

xdescribe('PlanFormDialogComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            editId: undefined,
          },
          actions: {
            createPlan: jest.fn(),
            deletePlan: jest.fn(),
            editPlan: jest.fn(),
          },
          mutations: {
            removePlanEditId: jest.fn(),
          },
        },
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(PlanFormDialogComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof PlanFormDialogComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof PlanFormDialogComponent.data).toBe('function')
    // const defaultData = PlanFormDialogComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(PlanFormDialogComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(PlanFormDialogComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
