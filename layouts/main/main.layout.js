export default {
  name: 'main-layout',
  components: {},
  props: [],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      title: 'Nomad Maps',
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
