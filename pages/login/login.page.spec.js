import mockConsole from 'jest-mock-console'
import LoginPageComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let signInAutomatic
let signInWithFacebook

describe('LoginPageComponent', () => {
  beforeEach(() => {
    mockConsole()
    signInAutomatic = jest.fn().mockRejectedValue({ error: 'err' })
    signInWithFacebook = jest.fn().mockRejectedValue({ error: 'err' })

    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            isLoading: false,
          },
          actions: {
            signInAutomatic,
            signInWithFacebook,
          },
        },
      },
    }
  })

  test('is a Vue instance', async () => {
    const wrapper = await mount(LoginPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('shows the dialog with privacy tab', async () => {
    const wrapper = await mount(LoginPageComponent, { storeOptions })
    expect(wrapper.vm.legalDialog).toBeFalsy()

    wrapper
      .findAll('a')
      .at(0)
      .trigger('click')

    expect(wrapper.vm.legalDialog).toBeTruthy()
    expect(wrapper.vm.legalDialogTab).toBe('privacy')
  })

  test('shows the dialog with service tab', async () => {
    const wrapper = await mount(LoginPageComponent, { storeOptions })
    expect(wrapper.vm.legalDialog).toBeFalsy()

    wrapper
      .findAll('a')
      .at(1)
      .trigger('click')

    expect(wrapper.vm.legalDialog).toBeTruthy()
    expect(wrapper.vm.legalDialogTab).toBe('service')
  })

  test('closes the dialog', async () => {
    const wrapper = await mount(LoginPageComponent, { storeOptions })
    wrapper
      .findAll('a')
      .at(1)
      .trigger('click')
    expect(wrapper.vm.legalDialog).toBeTruthy()

    wrapper
      .findAll('button')
      .at(1)
      .trigger('click')
    expect(wrapper.vm.legalDialog).toBeFalsy()
  })

  test('logs in automatically', async () => {
    signInAutomatic = jest.fn().mockResolvedValue(true)
    storeOptions.modules.auth.actions.signInAutomatic = signInAutomatic

    expect(signInAutomatic).not.toHaveBeenCalled()
    const wrapper = await mount(LoginPageComponent, { storeOptions })
    expect(signInAutomatic).toHaveBeenCalled()
  })
})
