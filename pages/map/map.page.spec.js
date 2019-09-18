describe('fake', () => {
  test('is true', () => {
    expect(true).toBeTruthy()
  })
})
// import MapPageComponent from '../index.vue'
// import { mount } from '@/test/test-utils'
//
// let storeOptions
//
// // TODO fix mock implementation of -> import { gmapApi } from 'vue2-google-maps'
//
// xdescribe('MapPageComponent', () => {
//   beforeEach(() => {
//     storeOptions = {
//       modules: {
//         plans: {
//           state: {
//             mine: [],
//             friends: [],
//           },
//           getters: {},
//         },
//       },
//     }
//   })
//
//   // is vue component
//   test('is Vue component', () => {
//     const wrapper = mount(MapPageComponent, { storeOptions })
//     expect(wrapper.isVueInstance()).toBeTruthy()
//   })
//   // Inspect the raw component options
//   test('has a created hook', () => {
//     // expect(typeof MapPageComponent.created).toBe('function');
//   })
//   // Evaluate the results of functions in
//   // the raw component options
//   test('sets the correct default data', () => {
//     // expect(typeof MapPageComponent.data).toBe('function')
//     // const defaultData = MapPageComponent.data();
//     // expect(defaultData.message).toBe('hello!');
//   })
//   // Inspect the component instance on mount
//   test('correctly sets the message when created', () => {
//     // const vm = new Vue(MapPageComponent).$mount();
//     // expect(vm.message).toBe('bye!');
//   })
//   // Mount an instance and inspect the render output
//   test('renders the correct message', () => {
//     // const Ctor = Vue.extend(MapPageComponent);
//     // const vm = new Ctor().$mount();
//     // expect(vm.$el.textContent).toBe('bye!');
//   })
// })
