import CardPlanComponent from './index.vue'
import { mount } from '@/test/test-utils'

let propsData
let storeOptions

let confirmPlan
let formattedNameShort
let setPlanEditId
let showDialogPlanForm
let toggleHighlightedId

const isHighlighted = (wrapper, is = true) => {
  if (!is) {
    expect(wrapper.classes()).toContain('white')
    expect(wrapper.classes()).not.toContain('amber')
    expect(wrapper.vm.plan.id).not.toEqual(
      storeOptions.modules.plans.state.highlightId
    )
  } else {
    expect(wrapper.classes()).not.toContain('white')
    expect(wrapper.classes()).toContain('amber')
    expect(wrapper.vm.plan.id).toEqual(
      storeOptions.modules.plans.state.highlightId
    )
  }
}

describe('CardPlanComponent', () => {
  beforeEach(() => {
    confirmPlan = jest.fn().mockResolvedValue()
    formattedNameShort = jest.fn()
    setPlanEditId = jest.fn()
    showDialogPlanForm = jest.fn()
    toggleHighlightedId = jest.fn((id) => {
      storeOptions.modules.plans.state.highlightId = id
    })

    propsData = {
      plan: {
        id: 'test-id',
        startAt: '2019-06-01',
        endAt: '2019-06-01',
        description: '',
        friends: [],
        confirmed: false,
        place: {
          formattedNameShort,
        },
      },
    }

    storeOptions = {
      modules: {
        plans: {
          namespaced: true,
          state: {
            mine: [],
            friends: [],
            highlightId: '',
          },
          mutations: {
            setPlanEditId,
            toggleHighlightedId,
          },
          actions: {
            confirmPlan,
          },
        },
        layout: {
          namespaced: true,
          mutations: {
            showDialogPlanForm,
          },
        },
      },
    }
  })

  test('is Vue component', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('is not highlighted', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    isHighlighted(wrapper, false)
  })

  test('is highlighted', () => {
    storeOptions.modules.plans.state.highlightId = 'test-id'
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    isHighlighted(wrapper)
  })

  test('is not confirmed', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    const button = wrapper.findAll('button').at(0)

    expect(button.text().toLowerCase()).toEqual('confirm')
  })

  test('is confirmed', () => {
    propsData.plan.confirmed = true
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    const button = wrapper.findAll('button').at(0)

    expect(button.text().toLowerCase()).toEqual('confirmed')
    expect(button.attributes('disabled')).toBeTruthy()
  })

  test('can be highlighted with click', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    isHighlighted(wrapper, false)

    wrapper.find('.v-list-item').trigger('click')

    expect(toggleHighlightedId).toHaveBeenCalled()
  })

  test('can be highlighted from state change', () => {
    const scrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    isHighlighted(wrapper, false)

    storeOptions.modules.plans.state.highlightId = 'test-id'

    expect(scrollIntoView).toHaveBeenCalled()
    isHighlighted(wrapper)
  })

  test('can be confirmed', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    let button = wrapper.findAll('button').at(0)
    expect(button.text().toLowerCase()).toEqual('confirm')

    button.trigger('click')
    button = wrapper.findAll('button').at(0)

    expect(confirmPlan).toHaveBeenCalled()
  })

  test('can edit', () => {
    const wrapper = mount(CardPlanComponent, { storeOptions, propsData })
    const editButton = wrapper
      .findAll('button')
      .filter((el) => el.text().toLowerCase() === 'edit')
    expect(editButton.length).toBe(1)

    editButton.trigger('click')

    expect(setPlanEditId).toHaveBeenCalled()
    expect(showDialogPlanForm).toHaveBeenCalled()
  })
})
