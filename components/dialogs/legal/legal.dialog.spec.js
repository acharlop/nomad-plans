import LegalDialogComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('LegalDialogComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(LegalDialogComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('closes when show is false', () => {
    const wrapper = mount(LegalDialogComponent)
    wrapper.setData({ show: false })
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('does not close when show is true', () => {
    const wrapper = mount(LegalDialogComponent)
    wrapper.setData({ show: true })
    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
