import Vue from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

import CardPlan from '@/components/card-plan'

// const date = new Date()

export default Vue.component('SideDrawer', {
  components: {
    CardPlan,
  },
  props: [],
  data() {
    return {
      skeletons: [
        'heading, text, actions',
        'heading, text, sentences, actions',
        'heading, text, actions',
        'heading, text, paragraph, actions',
      ],
    }
  },
  computed: {
    ...mapState({
      showSideDrawer: (state) => state.layout.showSideDrawer,
      sideDrawerTab: (state) => state.layout.sideDrawerTab,
      myPlans: (state) => state.plans.mine,
      friendsPlans: (state) => state.plans.friends,
      isLoading: (state) => state.plans.isLoading,
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
  created() {
    this.$store.dispatch('plans/getPlans')
  },
  methods: {
    ...mapMutations('layout', ['showDialogInvite', 'showDialogPlanForm']),
    ...mapGetters('plans', ['myFilteredPlans']),
  },
})
