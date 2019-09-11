import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.component('SideDrawer', {
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      showSideDrawer: (state) => state.layout.showSideDrawer,
      sideDrawerTab: (state) => state.layout.sideDrawerTab,
    }),
    visible: {
      get() {
        return this.showSideDrawer
      },
      set() {
        this.$store.commit('layout/toggleSideDrawer')
      },
    },
    selectedTab: {
      get() {
        return `tab-${this.sideDrawerTab}`
      },
      set() {
        this.$store.commit('layout/toggleSideDrawerTab')
      },
    },
  },
  mounted() {},
})
