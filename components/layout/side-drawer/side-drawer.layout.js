import Vue from 'vue'
import { mapState } from 'vuex'
import InvitesDialog from '@/components/dialogs/invites'

export default Vue.component('SideDrawer', {
  components: {
    InvitesDialog,
  },
  props: [],
  data() {
    return {
      invitesDialog: false,
    }
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
  methods: {
    showInvitesDialog() {
      // this.profileMenu = false
      // this.legalDialog = false
      this.invitesDialog = true
    },
    hideDialog() {
      this.invitesDialog = false
    },
  },
})
