import Vue from 'vue'
import AppBar from '@/components/layout/app-bar'

export default Vue.component('MainLayout', {
  components: {
    AppBar,
  },
  props: [],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Welcome',
        //   to: '/',
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
      ],
      miniVariant: false,
      right: true,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
})
