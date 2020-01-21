import Vue from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import getDaysInYear from 'date-fns/getDaysInYear'
import getDayOfYear from 'date-fns/getDayOfYear'
import { confirmations } from '~/utils/confirmations'
import { dayInPlan } from '@/utils/date'

const day = new Date()

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      day,
      sliderValue: getDayOfYear(day),
      filterItems: confirmations.t.all,
      filters: [],
      filteredCurrentYear: day.getFullYear(),
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
      yearPlansIds: [undefined],
    }
  },
  computed: {
    ...mapState({
      highlightId: (state) => state.plans.highlightId,
    }),
    currentYear: {
      get() {
        return this.filteredCurrentYear
      },
      set(value) {
        this.filteredCurrentYear = value
        this.today.setYear(value)
        this.setYearPlansIds(value)
      },
    },
    nextYear() {
      return this.currentYear + 1
    },
    prevYear() {
      return this.currentYear - 1
    },
    plans() {
      return this.myFilteredPlans()
    },
    firstPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[this.plans.length - 1].startAt.substring(0, 4))
        : day.getFullYear()
    },
    finalPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[0].endAt.substring(0, 4))
        : day.getFullYear()
    },
    hasPlansYearNext() {
      return this.nextYear <= this.finalPlanYear
    },
    hasPlansYearPrev() {
      return this.prevYear >= this.firstPlanYear
    },
    daysInYear() {
      return getDaysInYear(new Date(this.currentYear, 0, 1))
    },
  },
  watch: {
    filters(newVal) {
      this.setConfirmationsFilters(confirmations.t2i(newVal))
    },
    sliderValue(newVal) {
      this.highlightIdForDay(newVal)
    },
    plans(newVal) {
      this.setYearPlansIds()
    },
  },
  mounted() {
    this.filters = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters', 'setHighlightedId']),
    ...mapGetters('plans', ['myFilteredPlans']),
    setMonth(month) {
      this.day.setMonth(month, 1)
      this.sliderValue = getDayOfYear(this.day)
    },
    dayOfYearToDate(day = 1) {
      this.day.setMonth(this.getMonth, day)
      return this.day.getDate()
    },
    highlightIdForDay(day) {
      if (this.highlightId !== this.yearPlansIds[day])
        this.setHighlightedId(this.yearPlansIds[day])
    },
    setYearPlansIds(year = this.currentYear) {
      this.yearPlansIds = [undefined]

      const day = new Date(year, 0, 1)
      let hasPlan = false

      for (let i = 1; i <= this.daysInYear; i++) {
        day.setMonth(0, i)
        hasPlan = false

        for (const plan of this.plans) {
          if (dayInPlan(day, plan)) {
            this.yearPlansIds.push(plan.id)
            hasPlan = true
            break
          }
        }

        if (!hasPlan) this.yearPlansIds.push(undefined)
      }

      this.highlightIdForDay(this.sliderValue)
    },
  },
})
