import SideDrawerLayoutComponent from './index.vue'
import { mount } from '@/test/test-utils'

let storeOptions
let toggleSideDrawer
let toggleSideDrawerTab
let myFilteredPlans

describe('SideDrawerLayoutComponent', () => {
  beforeEach(() => {
    toggleSideDrawer = jest.fn()
    toggleSideDrawerTab = jest.fn()
    myFilteredPlans = jest.fn(() => [])

    storeOptions = {
      modules: {
        layout: {
          namespaced: true,
          state: {
            showSideDrawer: true,
            sideDrawerTab: 'mine',
          },
          mutations: {
            toggleSideDrawer,
            toggleSideDrawerTab,
          },
        },
        plans: {
          namespaced: true,
          state: {
            mine: [],
            friends: [],
          },
          actions: {
            getPlans: jest.fn(),
          },
          getters: {
            myFilteredPlans,
          },
        },
      },
    }
  })

  // is vue component
  test('is Vue component', () => {
    const wrapper = mount(SideDrawerLayoutComponent, { storeOptions })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('toggles visibility', () => {
    const wrapper = mount(SideDrawerLayoutComponent, { storeOptions })
    wrapper.setData({ visible: false })
    expect(toggleSideDrawer).toHaveBeenCalled()
  })

  test('toggles selected tab', () => {
    const wrapper = mount(SideDrawerLayoutComponent, { storeOptions })
    wrapper.setData({ selectedTab: 'friends' })
    expect(toggleSideDrawerTab).toHaveBeenCalled()
  })
})
