import MainLayoutComponent from '../main'
import { shallow } from '@/test/test-utils'

jest.mock('@/components/dialogs/plan-form', () => () => 'PlanFormDialog')

let storeOptions
let closeDialogs
let toggleSideDrawer

describe('MainLayoutComponent', () => {
  beforeEach(() => {
    closeDialogs = jest.fn()
    toggleSideDrawer = jest.fn()

    storeOptions = {
      modules: {
        layout: {
          namespaced: true,
          state: {
            showSideDrawer: true,
            dialogs: {
              legal: false,
              invite: false,
              planForm: false,
            },
          },
          mutations: {
            closeDialogs,
            toggleSideDrawer,
          },
        },
      },
    }
  })

  // is Vue instance
  test('is Vue instance', () => {
    const wrapper = shallow(MainLayoutComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('toggles side drawer on resize', () => {
    global.innerWidth = 500
    shallow(MainLayoutComponent, { storeOptions })
    expect(toggleSideDrawer).not.toHaveBeenCalled()

    global.innerWidth = 700
    global.dispatchEvent(new Event('resize'))

    expect(toggleSideDrawer).toHaveBeenCalled()
  })
})
