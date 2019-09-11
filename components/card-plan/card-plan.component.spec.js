import CardPlanComponentComponent from './index.vue'
import { mount } from '@/test/test-utils'

let propsData
const date = new Date()

describe('CardPlanComponentComponent', () => {
  beforeEach(() => {
    propsData = {
      plan: {
        place: 'Chaing Mai, Thailand',
        startAt: date.toDateString(),
        endAt: date.toDateString(),
        description: '',
        friends: [],
        confirmed: true,
      },
    }
  })
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(CardPlanComponentComponent, { propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  // Inspect the raw component options
  test('has a created hook', () => {
    // expect(typeof CardPlanComponentComponent.created).toBe('function');
  })
  // Evaluate the results of functions in
  // the raw component options
  test('sets the correct default data', () => {
    // expect(typeof CardPlanComponentComponent.data).toBe('function')
    // const defaultData = CardPlanComponentComponent.data();
    // expect(defaultData.message).toBe('hello!');
  })
  // Inspect the component instance on mount
  test('correctly sets the message when created', () => {
    // const vm = new Vue(CardPlanComponentComponent).$mount();
    // expect(vm.message).toBe('bye!');
  })
  // Mount an instance and inspect the render output
  test('renders the correct message', () => {
    // const Ctor = Vue.extend(CardPlanComponentComponent);
    // const vm = new Ctor().$mount();
    // expect(vm.$el.textContent).toBe('bye!');
  })
})
