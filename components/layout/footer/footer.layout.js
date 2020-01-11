import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import getDayOfYear from 'date-fns/getDayOfYear'
import lightFormat from 'date-fns/lightFormat'
import { confirmations } from '~/utils/confirmations'

const thisYear = new Date().getFullYear()

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      day: new Date(),
      sliderValue: 1,
      filterItems: confirmations.t.all,
      filters: [],
      filteredCurrentYear: thisYear,
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
    }
  },
  computed: {
    currentYear: {
      get() {
        return this.filteredCurrentYear
      },
      set(value) {
        this.filteredCurrentYear = value
        this.day.setYear(value)
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
        : thisYear
    },
    finalPlanYear() {
      return this.plans.length
        ? parseInt(this.plans[0].endAt.substring(0, 4))
        : thisYear
    },
    hasPlansYearNext() {
      return this.nextYear <= this.finalPlanYear
    },
    hasPlansYearPrev() {
      return this.prevYear >= this.firstPlanYear
    },
    sliderSteps() {
      return (
        differenceInCalendarDays(
          new Date(this.nextYear, 0, 1),
          new Date(this.currentYear, 0, 1)
        ) - 1
      )
    },
    selectedDate() {
      return lightFormat(
        new Date(this.currentYear, 0, this.sliderValue),
        'yyyy-MM-dd'
      )
    },
    selectedMonth() {
      return (
        parseInt(
          lightFormat(new Date(this.currentYear, 0, this.sliderValue), 'M')
        ) - 1
      )
    },
  },
  watch: {
    filters(newVal) {
      this.setConfirmationsFilters(confirmations.t2i(newVal))
    },
  },
  mounted() {
    this.filters = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters']),
    ...mapGetters('plans', ['myFilteredPlans']),
    setMonth(month) {
      this.sliderValue = getDayOfYear(new Date(this.currentYear, month))
    },
    dayOfYearToDate(day = 1) {
      return lightFormat(this.day.setDate(day), 'd')
    },
  },
})
