import Filters from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions

describe('FiltersComponent', () => {
  beforeEach(() => {
    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          mutations: {
            setConfirmationsFilters: jest.fn(),
          },
        },
      },
    }
  })
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(Filters, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})