import Vue from 'vue'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'


export default Vue.component('InvitesDialog', {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.$emit('close')
      },
    },
    icon() {
      return faFacebookSquare
    },
  },
  mounted() {},
  methods: {},
})
