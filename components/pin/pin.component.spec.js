import PinComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let propsData

describe('PinComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            highlightId: '',
          },
        },
        auth: {
          namespaced: true,
          state: {
            user: {
              photoURL: 'placeholder-image',
            },
          },
        },
      },
    }

    propsData = {
      plan: {
        id: 'test-id',
        confirmed: false,
        endAt: '9',
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(PinComponent, { storeOptions, propsData })

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('default props', () => {
    const wrapper = mount(PinComponent, { storeOptions })

    expect(wrapper.classes('pin')).toBeTruthy()
    expect(wrapper.find('circle').attributes('stroke-width')).toBe('5')
    expect(wrapper.find('circle').attributes('stroke')).toBe('#FFB300')
  })

  test('highlighted', () => {
    storeOptions.modules.plans.state.highlightId = 'test-id'

    const wrapper = mount(PinComponent, { storeOptions, propsData })

    expect(wrapper.classes('icon')).toBeTruthy()
    expect(wrapper.find('image')).toBeTruthy()
  })

  test('confirmed', () => {
    propsData.plan.confirmed = true

    const wrapper = mount(PinComponent, { storeOptions, propsData })

    expect(wrapper.classes('pin')).toBeTruthy()
    expect(wrapper.find('circle').attributes('stroke')).toBe('#8BC34A')
  })

  test('in the past', () => {
    propsData.plan.endAt = '1'

    const wrapper = mount(PinComponent, { storeOptions, propsData })

    expect(wrapper.classes('pin')).toBeTruthy()
    expect(wrapper.find('circle').attributes('stroke-width')).toBe('0')
  })
})
