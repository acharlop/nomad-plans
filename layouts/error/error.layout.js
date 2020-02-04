import Vue from 'vue'

export default Vue.component('ErrorLayout', {
  layout: 'empty',
  components: {},
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  computed: {
    errorText() {
      return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    },
  },
  mounted() {},
  methods: {},
  head() {
    return {
      title: this.errorText,
    }
  },
})
