import FooterComponent from './index.vue'
import { shallow } from '@/test/test-utils'

describe('FooterComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = shallow(FooterComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
