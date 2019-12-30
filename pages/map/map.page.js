import Vue from 'vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { gmapApi } from 'vue2-google-maps'
import { white } from 'ansi-colors'

export default Vue.component('MapPage', {
  layout: 'main',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
    }),
    google: gmapApi,
  },
  mounted() {},
  methods: {
    ...mapMutations('plans', ['toggleHighlightedId']),
    ...mapGetters('plans', ['highlightedPlan', 'myFilteredPlans']),
    markerClicked(planId) {
      this.toggleHighlightedId(planId)
    },
    icon(plan) {
      return {
        path: 'M14.9825 32.96C20.6117 31.5196 29.0553 19.159 29.0553 12.7952C29.0553 6.43136 22.7547 1.27246 14.9825 1.27246C7.21034 1.27246 0.909729 6.43136 0.909729 12.7952C0.909729 19.159 9.35341 31.5196 14.9825 32.96Z M14.9649 46.8933C18.0121 46.8933 20.4825 44.4248 20.4825 41.3798C20.4825 38.3347 18.0121 35.8662 14.9649 35.8662C11.9176 35.8662 9.44726 38.3347 9.44726 41.3798C9.44726 44.4248 11.9176 46.8933 14.9649 46.8933Z',  
        fillColor: '#FD1313',
        fillOpacity: this.highlightId === plan.id ? 1 : 0.5,
        rotation: 0,
        strokeWeight: 1,
        strokeColor: '#FD1313',
        // scale: this.highlightId === plan.id ? 1.15 : 1,
        anchor: new this.google.maps.Point(15, 48),
        // origin: new this.google.maps.Point(0, 0),
      }
    },
  },
})
