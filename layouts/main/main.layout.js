import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

// layout components
import AppBar from '@/components/layout/app-bar'
import Footer from '@/components/layout/footer'
import SideDrawer from '@/components/layout/side-drawer'

// dialogs
import InvitesDialog from '@/components/dialogs/invites'
import LegalDialog from '@/components/dialogs/legal'
import PlanFormDialog from '@/components/dialogs/plan-form'

export default Vue.component('MainLayout', {
  components: {
    AppBar,
    Footer,
    SideDrawer,
    InvitesDialog,
    LegalDialog,
    PlanFormDialog,
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      legalDialog: (state) => state.layout.dialogs.legal,
      inviteDialog: (state) => state.layout.dialogs.invite,
      planFormDialog: (state) => state.layout.dialogs.planForm,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('layout', ['closeDialogs']),
  },
})
