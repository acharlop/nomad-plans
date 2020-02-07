import Vue from 'vue'
import { mapState } from 'vuex'
import AppBar from '@/components/layout/app-bar'

export default Vue.component('ErrorLayout', {
  layout: 'empty',
  components: {
    AppBar,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
    errorText() {
      return this.is404
        ? 'The link you clicked on may be broken or no longer exist.'
        : `Something went wrong and returned a ${this.error.statusCode} error`
    },
    errorTitle() {
      return this.is404 ? "This page doesn't exist" : 'Sorry, an error occurred'
    },
    is404() {
      return this.error.statusCode === 404
    },
  },
  mounted() {},
  methods: {
    reload() {
      window.location.replace('/')
    },
  },
})

// TODO update nuxt.config to use this
// head() {
//   return {
//     title: this.errorText,
//   }
// },
