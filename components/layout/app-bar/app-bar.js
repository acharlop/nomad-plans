import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

import ProfileMenu from '@/components/menus/profile'

// TODO [vuetify] register globally - is there a fix in newer versions?
// Register a global custom directive called `v-blur` that prevents focus
Vue.directive('blur', {
  inserted: (el) => {
    el.onfocus = (ev) => ev.target.blur()
  },
})

export default Vue.component('AppBar', {
  components: {
    ProfileMenu,
  },
  props: [],
  data() {
    return {
      title: 'Nomad Plans',
    }
  },
  computed: {
    ...mapState({
      showSideDrawer: (state) => state.layout.showSideDrawer,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('layout', ['showDialogPlanForm', 'toggleSideDrawer']),
  },
})
