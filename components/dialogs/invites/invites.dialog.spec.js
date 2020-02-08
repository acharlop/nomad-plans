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

  // TODO [testing] fix error - [Vue warn]: Error in v-on handler: "TypeError: Cannot read property 'select' of null"
  test('copies link to clip board', () => {
    // setup
    const { execCommand } = document
    document.execCommand = jest.fn()

    // create
    const wrapper = mount(InvitesDialogComponent)
    expect(wrapper.vm.snackbar).toBeFalsy()

    // click
    wrapper
      .findAll('button')
      .at(2)
      .trigger('click')

    // expected effects
    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(wrapper.vm.snackbar).toBeTruthy()

    // teardown
    document.execCommand = execCommand
  })
})
