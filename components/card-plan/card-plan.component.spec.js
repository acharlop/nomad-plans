import CardPlanComponentComponent from './index.vue'
import { mount } from '@/test/test-utils'

let propsData

// TODO fix testing with date-fns

xdescribe('CardPlanComponentComponent', () => {
  beforeEach(() => {
    propsData = {
      plan: {
        place: 'Chaing Mai, Thailand',
        startAt: '2019-06-01',
        endAt: '2019-06-01',
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
})
