import Vue from 'vue'
import { mapState } from 'vuex'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'

import AuthButton from '@/components/auth-button'
import LegalDialog from '@/components/dialogs/legal'
import InvitesDialog from '@/components/dialogs/invites'

export default Vue.component('AppBar', {
  components: {
    AuthButton,
    LegalDialog,
    InvitesDialog,
  },
  props: [],
  data() {
    return {
      title: 'Nomad Maps',
      profileMenu: false,
      legalDialog: false,
      invitesDialog: false,
      Dialog: false,
    }
  },
  computed: {
    ...mapState({
      photoURL: (state) => `${state.auth.user.photoURL}?height=36&width=36`,
      name: (state) => state.auth.user.displayName,
      email: (state) => state.auth.user.email,
      iconPage: () => faFacebook,
      iconMessage: () => faFacebookMessenger,
      iconGlobe: () => faGlobe,
      iconMap: () => faMap,
      iconAdd: () => faPlusCircle,
    }),
  },
  mounted() {},
  methods: {
    showInvitesDialog() {
      this.profileMenu = false
      this.legalDialog = false
      this.invitesDialog = true
    },
    showLegalDialog() {
      this.profileMenu = false
      this.invitesDialog = false
      this.legalDialog = true
    },
    hideDialog() {
      this.legalDialog = false
      this.invitesDialog = false
    },
  },
})
