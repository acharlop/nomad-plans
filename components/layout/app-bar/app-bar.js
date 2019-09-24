import Vue from 'vue'
import { mapMutations } from 'vuex'

import ProfileMenu from '@/components/menus/profile'

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
  computed: {},
  mounted() {},
  methods: {
    ...mapMutations('layout', ['showDialogPlanForm', 'toggleSideDrawer']),
  },
})
