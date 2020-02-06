import PinComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('PinComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(PinComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
