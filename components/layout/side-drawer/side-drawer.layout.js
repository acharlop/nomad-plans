import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import CardPlan from '@/components/card-plan'

// const date = new Date()

export default Vue.component('SideDrawer', {
  components: {
    CardPlan,
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      showSideDrawer: (state) => state.layout.showSideDrawer,
      sideDrawerTab: (state) => state.layout.sideDrawerTab,
      myPlans: (state) => state.plans.mine,
      friendsPlans: (state) => state.plans.friends,
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
  methods: {
    ...mapMutations('layout', ['showDialogInvite', 'showDialogPlanForm']),
  },
})