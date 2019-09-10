import Vue from 'vue'
import AuthButton from '@/components/auth-button'
import MapSvg from '@/assets/svgs/world.svg'

export default Vue.component('LandingPageComponent', {
  components: {
    AuthButton,
    MapSvg,
  },
  props: [],
  data() {
    return {
      signUp: false,
    }
  },
  computed: {},
  created() {},
  methods: {},
})
