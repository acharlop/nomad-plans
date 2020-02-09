import Vue from 'vue'
import Clamp from 'vue-clamp'
import { mapState, mapMutations } from 'vuex'
import { formatDistance, formatRange } from '~/utils/date'

export default Vue.component('CardPlan', {
  components: {
    Clamp,
  },
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      confirmLoading: false,
    }
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
    }),
    isHighlighted() {
      return this.highlightId && this.plan.id === this.highlightId
    },
    dateRange() {
      return formatRange(this.plan.startAt, this.plan.endAt)
    },
    confirmed() {
      return this.plan.confirmed
    },
    dateDistance() {
      return formatDistance(this.plan.startAt, this.plan.endAt)
    },
    placeName() {
      return this.plan.place.formattedNameShort()
    },
  },
  watch: {
    isHighlighted(newVal) {
      if (newVal && !this.settingPlan)
        this.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      this.settingPlan = false
    },
  },
  mounted() {},
  methods: {
    ...mapMutations('plans', ['toggleHighlightedId']),
    planClicked() {
      this.settingPlan = true
      this.toggleHighlightedId(this.plan.id)
    },
    confirmPlan() {
      this.confirmLoading = true

      this.$store.dispatch('plans/confirmPlan', this.plan.id).then(() => {
        this.confirmLoading = false
      })
    },
    edit() {
      this.$store.commit('plans/setPlanEditId', this.plan.id)
      this.$store.commit('layout/showDialogPlanForm')
    },
  },
})
