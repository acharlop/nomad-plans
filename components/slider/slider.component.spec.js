import SliderComponentComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let myFilteredPlans

describe('SliderComponentComponent', () => {
  beforeEach(() => {
    myFilteredPlans = jest.fn(() => [])

    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            mine: [],
            friends: [],
            highlightId: '',
          },
          actions: {
            getPlans: jest.fn(),
          },
          getters: {
            myFilteredPlans,
          },
          mutations: {
            setHighlightedId: jest.fn(),
          },
        },
      },
    }
  })
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(SliderComponentComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
