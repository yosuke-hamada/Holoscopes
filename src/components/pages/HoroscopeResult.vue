<template>
  <div>
    <!-- <div class="inputFiele">
      <v-label :text="'名前'"></v-label>
    </div> -->
    <v-label :text="content"></v-label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Horoscope } from '../../types/horoscope'
import { ChartData, ChartDataSets } from 'chart.js'
import { apiCall } from '../../api/api-call'
import VChart from '../atoms/VChart.vue'
import VLabel from '../atoms/VLabel.vue'

const chartData: ChartData = {
  labels: [],
  datasets: [],
}

const dataset: ChartDataSets = {
  label: '',
  data: [],
  backgroundColor: [],
  borderColor: [],
  pointBackgroundColor: [],
  pointBorderColor: [],
}

const datasets: ChartDataSets[] = []

export default Vue.extend({
  components: {
    VLabel,
  },
  data(): {
    chartData: ChartData
    content: string
  } {
    return {
      chartData: chartData,
      content: '',
    }
  },
  async created() {
    const result = await apiCall.fetchResult()
    result.map(item => {
      if (dataset.data !== undefined) {
        dataset.data.push(item.money)
        dataset.data.push(item.job)
        dataset.data.push(item.love)
        dataset.data.push(item.total)
        datasets.push(dataset)
        console.log(item)
      }
    })
    console.log(result)
    console.log(chartData.labels)
    console.log(datasets)

    this.content = result[0].sign
  },
})
</script>
<style lang="sass" scoped></style>
