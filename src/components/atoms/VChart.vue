<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options.d'
import { Radar, mixins } from 'vue-chartjs'
import { ChartData, ChartOptions } from 'chart.js'

export default Vue.extend({
  extends: Radar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object as Prop<ChartData>,
    },
    options: {
      type: Object as Prop<ChartOptions>,
    },
    width: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
    height: {
      type: ([String, Number] as any) as Prop<string | number>,
    },
  },
  mounted(): void {
    ;(this as any).renderChart(this.chartData, this.options)
  },
})
</script>
