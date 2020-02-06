import LoaderComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('LoaderComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(LoaderComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
