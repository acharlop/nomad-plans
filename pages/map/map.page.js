import Vue from 'vue'
import { mapState } from 'vuex'
import { gmapApi } from 'vue2-google-maps'

export default Vue.component('MapPage', {
  layout: 'main',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      myPlans: (state) => state.plans.mine,
    }),
    google: gmapApi,
  },
  mounted() {},
  methods: {},
})
