import FooterComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('FooterComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(FooterComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
