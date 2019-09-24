import InvitesDialogComponent from './index.vue'
import { mount } from '@/test/test-utils'

describe('LegalDialogComponent', () => {
  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(InvitesDialogComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('closes when show is false', () => {
    const wrapper = mount(InvitesDialogComponent)
    wrapper.setData({ show: false })
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('does not close when show is true', () => {
    const wrapper = mount(InvitesDialogComponent)
    wrapper.setData({ show: true })
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  // TODO fix error - [Vue warn]: Error in v-on handler: "TypeError: Cannot read property 'select' of null"
  xtest('copies link to clip board', () => {
    const wrapper = mount(InvitesDialogComponent)
    const buttons = wrapper.findAll('button')

    const input = wrapper.find('#nomadLink')
    expect(input).toBeTruthy()
    input.select = jest.fn()

    wrapper.copyText = jest.fn()

    buttons.at(2).trigger('click')
    expect(wrapper.copyText).toHaveBeenCalled()
  })
})
