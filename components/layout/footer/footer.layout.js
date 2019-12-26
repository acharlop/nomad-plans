import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import getDayOfYear from 'date-fns/getDayOfYear'
import { confirmations } from '~/utils/confirmations'

const thisYear = new Date().getFullYear()

export default Vue.component('Footer', {
  components: {},
  props: [],
  data() {
    return {
      currentDate: 1,
      filterItems: confirmations.t.all,
      chips: [],
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
      return length
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
      return differenceInCalendarDays(
        new Date(this.nextYear, 0, 1),
        new Date(this.currentYear, 0, 1)
      )
    },
  },
  watch: {
    chips(newVal) {
      this.setConfirmationsFilters(confirmations.t2i(newVal))
    },
  },
  mounted() {
    this.chips = []
  },
  methods: {
    ...mapMutations('plans', ['setConfirmationsFilters']),
    ...mapGetters('plans', ['myFilteredPlans']),
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    setMonth(month) {
      this.currentDate = getDayOfYear(new Date(this.currentYear, month))
    },
  },
})
