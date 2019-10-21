<template>
  <div>
    <div class="input-field">
      <div class="input-name">
        <v-label :text="'名前'" :width="'100px'"></v-label>
        <v-text-input @input="getTargetName"></v-text-input>
      </div>
      <div class="input-birthday">
        <v-label :text="'生年月日'" :width="'100px'"></v-label>
        <v-text-input @input="getTargetMonth"></v-text-input>
        <v-label :text="'月'"></v-label>
        <v-text-input @input="getTargetDay"></v-text-input>
        <v-label :text="'日'"></v-label>
      </div>
      <div class="button-field">
        <v-button
          :text="'占う'"
          :width="'300px'"
          :font-size="'30px'"
          :background-color="'#FFC107'"
          :color="'#ffffff'"
          @click="outputResult"
        ></v-button>
      </div>
    </div>
    <v-label :text="errorMessage"></v-label>
    <v-chart :chart-data="chartData" :options="options"></v-chart>
    <v-label :text="content"></v-label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js'
import { apiCall } from '../../api/api-call'
import VChart from '../atoms/VChart.vue'
import VLabel from '../atoms/VLabel.vue'
import VTextInput from '../atoms/VTextInput.vue'
import VButton from '../atoms/VButton.vue'
import Constellation from '../../types/constellation'

export default Vue.extend({
  components: {
    VLabel,
    VChart,
    VTextInput,
    VButton,
  },
  data(): {
    chartData: ChartData
    content: string
    options: ChartOptions
    targetName: string
    targetMonth: string
    targetDay: string
    errorMessage: string
    disabled: string
    specialPoint: number
  } {
    return {
      chartData: {},
      content: '',
      options: {
        responsive: true,
        scale: {
          display: false,
          ticks: {
            stepSize: 1,
            max: 5,
            beginAtZero: true,
          },
        },
      },
      targetName: '',
      targetMonth: '',
      targetDay: '',
      errorMessage: '',
      disabled: '',
      specialPoint: 0,
    }
  },
  methods: {
    getTargetName(value: string): void {
      this.targetName = value
    },
    getTargetMonth(value: string): void {
      if (value.length > 2) {
        this.errorMessage = '月には2桁以下の数字を入力してください'
        return
      }

      this.errorMessage = ''
      this.targetMonth = value
    },
    getTargetDay(value: string): void {
      if (value.length > 2) {
        this.errorMessage = '日には2桁以下の数字を入力してください'
        return
      }

      this.errorMessage = ''
      this.targetDay = value
    },
    changeOption(): void {
      if (this.options.scale !== undefined) this.options.scale.display = true
    },
    async outputResult(): Promise<void> {
      const targetBirthday = `${this.targetMonth}-${this.targetDay}`
      const targetSign = Constellation.getConstellation(targetBirthday)

      if (targetSign === null) {
        this.errorMessage = '不正な日付です'
        return
      }

      this.changeOption()
      const result = await apiCall.fetchResult()
      const dataset = result.filter(element => {
        return element.sign === targetSign
      })

      this.content = dataset[0].content

      const resultDataset: number[] = []
      resultDataset.push(dataset[0].money)
      resultDataset.push(dataset[0].job)
      resultDataset.push(dataset[0].love)
      resultDataset.push(dataset[0].total)
      resultDataset.push(Math.floor(Math.random() * 5) + 1)
      const chartDataset: ChartDataSets = {}
      chartDataset.data = [...resultDataset]
      const chartDatasets: ChartDataSets[] = [chartDataset]
      this.chartData = {
        labels: ['お金', '仕事', '恋愛', '総合', '特別点'],
        datasets: chartDatasets,
      }
      this.errorMessage = ''
    },
  },
})
</script>
<style lang="sass" scoped>
.input-field
  margin-top: 20px
  padding: 20px
  border: 1px solid #eee
  border-radius: 5px
.input-name, .input-birthday
  margin: 10px 0
.button-field
  margin-top: 30px
  text-align: center
</style>
