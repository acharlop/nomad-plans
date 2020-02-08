import mockConsole from 'jest-mock-console'
import LoginPageComponent from './index.vue'
import { shallow, mount } from '@/test/test-utils'

let storeOptions
let signInAutomatic
let signInWithFacebook
let mocks
let restore

describe('LoginPageComponent', () => {
  beforeEach(() => {
    restore = mockConsole()
    signInAutomatic = jest.fn().mockRejectedValue({ error: 'no-auto-login' })
    signInWithFacebook = jest.fn()

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

    mocks = {
      $router: {
        push: jest.fn(),
      },
    }
  })

  test('is a Vue instance', async () => {
    const wrapper = await shallow(LoginPageComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('shows the dialog with privacy tab', async () => {
    const wrapper = await shallow(LoginPageComponent, { storeOptions })
    expect(wrapper.vm.legalDialog).toBeFalsy()

    wrapper
      .findAll('a')
      .at(0)
      .trigger('click')

    expect(wrapper.vm.legalDialog).toBeTruthy()
    expect(wrapper.vm.legalDialogTab).toBe('privacy')
  })

  test('shows the dialog with service tab', async () => {
    const wrapper = await shallow(LoginPageComponent, { storeOptions })
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
    await shallow(LoginPageComponent, {
      storeOptions,
      mocks,
      mockRouter: false,
    })
    expect(signInAutomatic).toHaveBeenCalled()
  })

  test('logs in', async () => {
    signInWithFacebook = jest.fn().mockResolvedValue()
    storeOptions.modules.auth.actions.signInWithFacebook = signInWithFacebook

    const wrapper = await mount(LoginPageComponent, {
      storeOptions,
      mocks,
      mockRouter: false,
    })

    expect(signInWithFacebook).not.toHaveBeenCalled()
    wrapper.find('.auth-button').trigger('click')
    expect(signInWithFacebook).toHaveBeenCalled()
  })

  test('handles login error', async () => {
    signInWithFacebook = jest.fn().mockRejectedValue({ error: 'err' })
    storeOptions.modules.auth.actions.signInWithFacebook = signInWithFacebook

    const wrapper = await mount(LoginPageComponent, { storeOptions })

    expect(signInWithFacebook).not.toHaveBeenCalled()
    wrapper.find('.auth-button').trigger('click')
    expect(signInWithFacebook).toHaveBeenCalled()
  })

  // TODO figure out how to toggle state
  xtest('toggles loading state', async () => {
    restore()
    storeOptions.modules.auth.state.isLoading = true
    const wrapper = await shallow(LoginPageComponent, { storeOptions })

    expect(wrapper.vm.loading).toBeTruthy()
    storeOptions.modules.auth.state.isLoading = false
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.loading).toBeFalsy()
  })
})
