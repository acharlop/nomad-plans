import Vue from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import getDayOfYear from 'date-fns/getDayOfYear'
import getDaysInYear from 'date-fns/getDaysInYear'
import { dayInPlan, formatDate } from '~/utils/date'

const day = new Date()

export default Vue.component('Slider', {
  components: {},
  props: [],
  data() {
    return {
      year: day.getFullYear(),
      month: day.getMonth(),
      sliderValue: getDayOfYear(day),
      inputValue: formatDate(day.toISOString()),
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      plansYearMap: [undefined],
    }
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
      isLoading: (state) => state.plans.isLoading,
    }),
    nextYear() {
      return this.year + 1
    },
    prevYear() {
      return this.year - 1
    },
    plans() {
      return this.myFilteredPlans() || []
    },
    firstPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[this.plans.length - 1].startAt.substring(0, 4))
        : this.year
    },
    finalPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[0].endAt.substring(0, 4))
        : this.year
    },
    hasPlansYearNext() {
      return this.nextYear <= this.finalPlanYear
    },
    hasPlansYearPrev() {
      return this.prevYear >= this.firstPlanYear
    },
    daysInYear() {
      return getDaysInYear(new Date(this.year, 0, 1))
    },
    getMonth() {
      return this.month
    },
  },
  watch: {
    sliderValue(newVal) {
      this.setDay(newVal)
    },
    plans(newVal) {
      this.setPlansYearMap()
    },
  },
  mounted() {},
  methods: {
    ...mapMutations('plans', ['setHighlightedId']),
    ...mapGetters('plans', ['myFilteredPlans']),
    setMonth(month) {
      this.sliderValue = getDayOfYear(new Date(this.year, month, 1))
    },
    setYear(year) {
      const day = new Date(this.year, 0, this.sliderValue)
      day.setFullYear(year)
      this.year = year
      this.setPlansYearMap(year)
      this.sliderValue = getDayOfYear(day)
    },
    setDay(day) {
      if (!day) return
      // TODO figure out why {'__ob__'} is fetched
      const map = JSON.parse(JSON.stringify(this.plansYearMap[day]))

      this.inputValue = map.date
      this.month = map.month

      if (this.highlightId !== map.planId) this.setHighlightedId(map.planId)
    },
    setPlansYearMap(year = this.year) {
      this.plansYearMap = [undefined]

      const day = new Date(year, 0, 1)
      let date
      let month
      let planId

      for (let i = 1; i <= this.daysInYear; i++) {
        day.setMonth(0, i)

        date = formatDate(day.toISOString())
        month = day.getMonth()
        planId = undefined

        for (const plan of this.plans) {
          if (dayInPlan(day, plan)) {
            planId = plan.id
            break
          }
        }

        this.plansYearMap.push({ date, month, planId })
      }

      this.setDay(this.sliderValue)
    },
  },
})
