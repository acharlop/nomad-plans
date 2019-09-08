import Vue from 'vue'
import { mapState } from 'vuex'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'

import AuthButton from '@/components/auth-button'

export default Vue.component('AppBar', {
  components: {
    AuthButton,
  },
  props: [],
  data() {
    return {
      title: 'Nomad Maps',
      profileMenu: false,
    }
  },
  computed: {
    ...mapState({
      photoURL: (state) => `${state.auth.user.photoURL}?height=36&width=36`,
      name: (state) => state.auth.user.displayName,
      email: (state) => state.auth.user.email,
      iconPage() {
        return faFacebook
      },
      iconMessage() {
        return faFacebookMessenger
      },
      iconGlobe() {
        return faGlobe
      },
      iconMap() {
        return faMap
      },
      iconAdd() {
        return faPlusCircle
      },
    }),
  },
  mounted() {},
  methods: {},
})
