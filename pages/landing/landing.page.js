import VFacebookLogin from 'vue-facebook-login-component'
import config from '~/config'

export default {
  components: {
    VFacebookLogin,
  },
  props: [],
  data() {
    return {
      facebookAppId: config.facebook.secret,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
