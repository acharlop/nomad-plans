import Vue from 'vue'

export default Vue.component('CardPlan', {
  components: {},
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
      hasLongDescription: this.plan.description.length > 87,
      showMoreDescription: true,
      confirmLoading: false,
    }
  },
  computed: {
    date() {
      return `${this.plan.startAt} - ${this.plan.endAt}`
    },
    friendsList() {
      if (!this.plan.friends || !this.plan.friends.length) return []

      return this.plan.friends.length > 4 && this.showMoreFriends
        ? this.plan.friends.slice(0, 4)
        : this.plan.friends
    },
    description() {
      const index =
        this.hasLongDescription && this.showMoreDescription
          ? 80
          : this.plan.description.length
      return this.plan.description.slice(0, index)
    },
    confirmed() {
      return this.plan.confirmation === 1
    },
  },
  mounted() {},
  methods: {
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
