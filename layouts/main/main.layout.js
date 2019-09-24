import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import AppBar from '@/components/layout/app-bar'
import SideDrawer from '@/components/layout/side-drawer'
import PlanFormDialog from '@/components/dialogs/plan-form'
import InvitesDialog from '@/components/dialogs/invites'
import LegalDialog from '@/components/dialogs/legal'

export default Vue.component('MainLayout', {
  components: {
    AppBar,
    SideDrawer,
    PlanFormDialog,
    InvitesDialog,
    LegalDialog,
  },
  props: [],
  data() {
    return {
      currentWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState({
      legalDialog: (state) => state.layout.dialogs.legal,
      inviteDialog: (state) => state.layout.dialogs.invite,
      planFormDialog: (state) => state.layout.dialogs.planForm,
      showSideDrawer: (state) => state.layout.showSideDrawer,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('layout', ['closeDialogs', 'toggleSideDrawer']),
    handleResize() {
      if (this.currentWidth === window.innerWidth || !this.showSideDrawer)
        return

      if (window.innerWidth > 600) {
        this.toggleSideDrawer()
      }

      this.currentWidth = window.innerWidth
    },
  },
})
