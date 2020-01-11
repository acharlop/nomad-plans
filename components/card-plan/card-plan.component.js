import Vue from 'vue'
import Clamp from 'vue-clamp'
import { mapState, mapMutations } from 'vuex'
import { formatDistance, isWithinInterval } from '~/utils/date'

export default Vue.component('CardPlan', {
  components: {
    Clamp,
  },
  props: {
    plan: {
      type: Object,
      default: () => ({}),
    },
    userTripId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasLotsOfFriends: this.plan.friends
        ? this.plan.friends.length > 4
        : false,
      moreFriendsCount: this.plan.friends ? this.plan.friends.length - 4 : 0,
      showMoreFriends: true,
      confirmLoading: false,
      place: undefined,
    }
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
      highlightedDate: (state) => state.plans.highlightedDate,
    }),
    isHighlighted() {
      return (
        this.plan.id === this.highlightId ||
        isWithinInterval(this.highlightedDate, {
          startAt: this.plan.startAt,
          endAt: this.plan.endAt,
        })
      )
    },
    date() {
      const startAt = new Date(this.plan.startAt)
      const endAt = new Date(this.plan.endAt)

      const isSameYear = this.$dateFns.isSameYear(startAt, endAt)

      const dateFormat = 'MMM d, yyyy'
      const startFormat = isSameYear ? 'MMM d' : dateFormat

      return `${this.$dateFns.format(
        startAt,
        startFormat
      )} - ${this.$dateFns.format(endAt, dateFormat)}`
    },
    friendsList() {
      if (!this.plan.friends || !this.plan.friends.length) return []

      return this.plan.friends.length > 4 && this.showMoreFriends
        ? this.plan.friends.slice(0, 4)
        : this.plan.friends
    },
    confirmed() {
      return this.plan.confirmation === 1
    },
    dateRange() {
      return formatDistance(this.plan.startAt, this.plan.endAt)
    },
    placeName() {
      return this.plan.place.formattedNameShort()
    },
  },
  mounted() {},
  methods: {
    ...mapMutations('plans', ['toggleHighlightedId']),
    planClicked() {
      this.toggleHighlightedId(this.plan.id)
    },
    confirmPlan() {
      this.confirmLoading = true

      this.$store.dispatch('plans/confirmPlan', this.plan.id).then(() => {
        this.confirmLoading = false
      })
    },
    toggleFriendsList() {
      this.showMoreFriends = !this.showMoreFriends
    },
    toggleDescription() {
      this.showMoreDescription = !this.showMoreDescription
    },
    edit() {
      this.$store.commit('plans/setPlanEditId', this.plan.id)
      this.$store.commit('layout/showDialogPlanForm')
    },
  },
})
