import mockConsole from 'jest-mock-console'
import ProfileMenuComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let signOut
let showDialogLegal
let showDialogInvite
let wrapper
let mocks

describe('ProfileMenuComponent', () => {
  beforeEach(() => {
    signOut = jest.fn()
    showDialogLegal = jest.fn()
    showDialogInvite = jest.fn()
    wrapper = undefined

    storeOptions = {
      modules: {
        auth: {
          namespaced: true,
          state: {
            user: {
              photoUrl: '',
              name: '',
              email: '',
            },
          },
          actions: {
            signOut,
          },
        },
        layout: {
          namespaced: true,
          mutations: {
            showDialogLegal,
            showDialogInvite,
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

  // is vue component
  test('is Vue component', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('shows the dropdown', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions })
    const avatar = wrapper.find('.v-avatar')
    let links = wrapper.findAll('.v-list-item--link')

    expect(avatar).toBeTruthy()
    expect(links.length).toBe(0)

    avatar.trigger('click')
    links = wrapper.findAll('.v-list-item--link')
    expect(links.length).not.toBe(0)

    // TODO test toggle
    // avatar.trigger('click')
    // links = wrapper.findAll('.v-list-item--link')
    // expect(links.length).toBe(0)
  })

  xtest('toggles the dropdown', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions })
    const avatar = wrapper.find('.v-avatar')
    let links = wrapper.findAll('.v-list-item--link')

    expect(avatar).toBeTruthy()
    expect(links.length).toBe(0)

    avatar.trigger('click')
    links = wrapper.findAll('.v-list-item--link')
    expect(links.length).not.toBe(0)

    avatar.trigger('click')
    links = wrapper.findAll('.v-list-item--link')
    expect(links.length).toBe(0)
  })

  test('shows invite dialog', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions })
    wrapper.find('.v-avatar').trigger('click')
    const links = wrapper.findAll('.v-list-item--link')

    expect(showDialogInvite).not.toHaveBeenCalled()
    links.at(2).trigger('click')
    expect(showDialogInvite).toHaveBeenCalled()
  })

  test('shows legal dialog', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions })
    wrapper.find('.v-avatar').trigger('click')
    const links = wrapper.findAll('.v-list-item--link')

    expect(showDialogLegal).not.toHaveBeenCalled()
    links.at(3).trigger('click')
    expect(showDialogLegal).toHaveBeenCalled()
  })

  test('sign the user out', () => {
    wrapper = mount(ProfileMenuComponent, { storeOptions, mocks })
    wrapper.find('.v-avatar').trigger('click')
    const links = wrapper.findAll('.v-list-item--link')

    expect(signOut).not.toHaveBeenCalled()
    links.at(4).trigger('click')
    expect(signOut).toHaveBeenCalled()
  })

  test('handles sign out failure', async () => {
    mockConsole()
    signOut = jest.fn().mockRejectedValue({ error: 'err' })
    storeOptions.modules.auth.actions.signOut = signOut

    wrapper = mount(ProfileMenuComponent, { storeOptions })
    wrapper.find('.v-avatar').trigger('click')
    const links = wrapper.findAll('.v-list-item--link')

    expect(signOut).not.toHaveBeenCalled()
    await links.at(4).trigger('click')
    expect(signOut).toHaveBeenCalled()
    // TODO fix
    // expect(console.error).toHaveBeenCalledWith('err')
  })
})
