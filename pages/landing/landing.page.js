import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

import AuthButton from '@/components/auth-button'
// import MapSvg from '@/assets/svgs/world.svg'

export default Vue.component('LandingPageComponent', {
  components: {
    AuthButton,
    // MapSvg,
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isNewUser: (state) => state.auth.isNewUser,
    }),
  },
  created() {},
  methods: {
    ...mapMutations('auth', ['toggleNewUser']),
  },
})
