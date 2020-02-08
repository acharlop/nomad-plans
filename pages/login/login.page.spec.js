import LoginPageComponent from './index.vue'
import { mount } from '@/test/test-utils'

jest.mock('@/components/auth-button', () => () => 'AuthButton')

describe('LoginPageComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LoginPageComponent)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('shows the dialog with privacy tab', () => {
    const wrapper = mount(LoginPageComponent)
    expect(wrapper.vm.legalDialog).toBeFalsy()

    wrapper
      .findAll('a')
      .at(0)
      .trigger('click')

    expect(wrapper.vm.legalDialog).toBeTruthy()
    expect(wrapper.vm.legalDialogTab).toBe('privacy')
  })

  test('shows the dialog with privacy tab', () => {
    const wrapper = mount(LoginPageComponent)
    expect(wrapper.vm.legalDialog).toBeFalsy()

    wrapper
      .findAll('a')
      .at(1)
      .trigger('click')

    expect(wrapper.vm.legalDialog).toBeTruthy()
    expect(wrapper.vm.legalDialogTab).toBe('service')
  })

  test('closes the dialog', () => {
    const wrapper = mount(LoginPageComponent)
    wrapper
      .findAll('a')
      .at(1)
      .trigger('click')
    expect(wrapper.vm.legalDialog).toBeTruthy()

    wrapper
      .findAll('button')
      .at(0)
      .trigger('click')
    expect(wrapper.vm.legalDialog).toBeFalsy()
  })
})
