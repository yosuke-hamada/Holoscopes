<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options.d'
import { Radar, mixins } from 'vue-chartjs'

interface Dataset {
  label?: string[]
  data: number[]
  backgroundColor?: string[]
  borderColor?: string[]
  pointBackgroundColor?: string[]
  pointBorderColor?: string[]
}

interface ChartData {
  labels: string[]
  datasets: Dataset[]
}

const { reactiveProp } = mixins

export default Vue.extend({
  extends: Radar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object as Prop<ChartData>,
    },
    option: {
      type: Object as Prop<object>,
    },
    width: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    height: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
  },
  mounted(): void {
    ;(this as any).renderChart(this.chartData, this.option)
  },
})
</script>
<style lang="sass" scoped></style>
