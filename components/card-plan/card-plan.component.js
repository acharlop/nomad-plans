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
      date: `${this.plan.startAt} - ${this.plan.endAt}`,
      hasLotsOfFriends: this.plan.friends.length > 4,
      moreFriendsCount: this.plan.friends.length - 4,
      showMoreFriends: true,
      hasLongDescription: this.plan.description.length > 87,
      showMoreDescription: true,
    }
  },
  computed: {
    friendsList() {
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
  },
  mounted() {},
  methods: {
    toggleFriendsList() {
      this.showMoreFriends = !this.showMoreFriends
    },
    toggleDescription() {
      this.showMoreDescription = !this.showMoreDescription
    },
  },
})
