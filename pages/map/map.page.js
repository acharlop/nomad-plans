import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
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
      highlightId: (state) => state.plans.highlightId,
    }),
    google: gmapApi,
  },
  mounted() {},
  methods: {
    ...mapMutations('plans', ['toggleHighlightedId']),
    markerClicked(planId) {
      this.toggleHighlightedId(planId)
    },
    icon(plan) {
      return {
        path:
          'M37 18.9091C37 29.3523 25.9 49.6364 18.5 52C11.1 49.6364 0 29.3523 0 18.9091C0 8.46589 8.28273 0 18.5 0C28.7173 0 37 8.46589 37 18.9091Z',
        fillColor: '#FD1313',
        fillOpacity: 1,
        rotation: 0,
        strokeWeight: 0,
        scale: this.highlightId === plan.id ? 1.15 : 1,
        anchor: new this.google.maps.Point(25, 51),
        // origin: new this.google.maps.Point(0, 0),
      }
    },
  },
})
