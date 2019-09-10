import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.component('SideDrawer', {
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.layout.showSideDrawer
      },
      set() {
        this.$store.commit('layout/toggleSideDrawer')
      },
    },
    selectedTab: {
      get() {
        return `tab-${this.$store.state.layout.sideDrawerTab}`
      },
      set() {
        this.$store.commit('layout/toggleSideDrawerTab')
      },
    },
  },
  mounted() {},
})
