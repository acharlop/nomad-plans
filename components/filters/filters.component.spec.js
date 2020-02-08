import Filters from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let setUnconfirmedFilter
let setPastFilter

describe('FiltersComponent', () => {
  beforeEach(() => {
    setUnconfirmedFilter = jest.fn()
    setPastFilter = jest.fn()

    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            filters: {
              hidePast: false,
              hideUnconfirmed: false,
            },
          },
          mutations: {
            setPastFilter,
            setUnconfirmedFilter,
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

  test('toggles past filter', () => {
    const wrapper = mount(Filters, { storeOptions })
    const checkbox = wrapper.findAll('input').at(1)
    expect(wrapper.vm.past).toBeFalsy()

    checkbox.trigger('click')

    expect(wrapper.vm.past).toBeTruthy()
    expect(setPastFilter).toHaveBeenCalledTimes(1)

    checkbox.trigger('click')
    expect(wrapper.vm.past).toBeFalsy()
    expect(setPastFilter).toHaveBeenCalledTimes(2)
  })

  test('toggles unconfirmed filter', () => {
    const wrapper = mount(Filters, { storeOptions })
    const checkbox = wrapper.findAll('input').at(0)
    expect(wrapper.vm.unconfirmed).toBeFalsy()

    checkbox.trigger('click')

    expect(wrapper.vm.unconfirmed).toBeTruthy()
    expect(setUnconfirmedFilter).toHaveBeenCalledTimes(1)

    checkbox.trigger('click')
    expect(wrapper.vm.unconfirmed).toBeFalsy()
    expect(setUnconfirmedFilter).toHaveBeenCalledTimes(2)
  })
})
