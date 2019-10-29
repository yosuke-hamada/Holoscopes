<template>
  <div>
    <div class="input-field">
      <div class="input-name">
        <v-label :text="inputNameText" :width="inputLabelWidth"></v-label>
        <v-text-input @input="setTargetName"></v-text-input>
      </div>
      <div class="input-birthday">
        <v-label :text="inputBirthdayText" :width="inputLabelWidth"></v-label>
        <v-text-input @input="setTargetMonth"></v-text-input>
        <v-label :text="inputMonthText"></v-label>
        <v-text-input @input="setTargetDay"></v-text-input>
        <v-label :text="inputDayText"></v-label>
        <div>
          <v-label
            :text="showErrorMessage"
            :color="errorMessageColor"
          ></v-label>
        </div>
      </div>
      <div class="button-field">
        <v-button
          :text="inputButtonText"
          :width="buttonWidth"
          :font-size="buttonFontSize"
          :background-color="buttonBackGroundColor"
          :color="buttonColor"
          :disabled="buttonDisabled"
          @click="displayResult"
        ></v-button>
      </div>
    </div>
    <v-label :text="errorMessage" :color="errorMessageColor"></v-label>
    <v-chart :chart-data="chartData" :options="options"></v-chart>
    <div class="content-field">
      <div class="sign-field">
        <v-label :text="sign" :font-size="signFontSize"></v-label>
      </div>
      <v-label :text="content"></v-label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartOptions } from 'chart.js'
import { apiCall } from '../../libs/api-call'
import VChart from '../atoms/VChart.vue'
import VLabel from '../atoms/VLabel.vue'
import VTextInput from '../atoms/VTextInput.vue'
import VButton from '../atoms/VButton.vue'
import { constellation } from '../../libs/constellation'
import { Horoscope } from '../../types/horoscope'

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
    sign: string
    options: ChartOptions
    targetName: string
    targetMonth: string
    targetDay: string
    inputLabelWidth: string
    buttonWidth: string
    buttonFontSize: string
    buttonBackGroundColor: string
    buttonColor: string
    inputNameText: string
    inputBirthdayText: string
    inputMonthText: string
    inputDayText: string
    inputButtonText: string
    errorMessage: string
    errorMessageColor: string
    signFontSize: string
  } {
    return {
      chartData: {},
      content: '',
      sign: '',
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
      inputLabelWidth: '100px',
      buttonWidth: '300px',
      buttonFontSize: '30px',
      buttonBackGroundColor: '#FFC107',
      buttonColor: '#ffffff',
      inputNameText: '名前',
      inputBirthdayText: '生年月日',
      inputMonthText: '月',
      inputDayText: '日',
      inputButtonText: '占う',
      errorMessage: '',
      errorMessageColor: '#d93025',
      signFontSize: '18px',
    }
  },
  computed: {
    buttonDisabled(): boolean {
      return this.targetMonth.length > 2 || this.targetDay.length > 2
    },
    showErrorMessage(): string {
      return this.buttonDisabled
        ? '月日にはそれぞれ0文字以上2文字以下の数字を入力してください'
        : ''
    },
  },
  methods: {
    setTargetName(value: string): void {
      this.targetName = value
    },

    setTargetMonth(value: string): void {
      this.targetMonth = value
    },

    setTargetDay(value: string): void {
      this.targetDay = value
    },

    checkDateLength(value: string): boolean {
      return value.length > 2
    },

    displayChart(): void {
      if (this.options.scale !== undefined) this.options.scale.display = true
    },

    getTargetSign(month: string, day: string): string | null {
      const targetBirthday = `${month}-${day}`
      return constellation.getConstellation(targetBirthday)
    },

    getApiCallResult(): Promise<Horoscope[]> {
      return apiCall.fetchResult()
    },

    getChartDataset(
      datasets: Horoscope[],
      sign: string
    ): Horoscope | undefined {
      return datasets.find(dataset => {
        return dataset.sign === sign
      })
    },

    setDisplayContents(dataset: Horoscope): void {
      this.sign = dataset.sign
      this.content = dataset.content
    },

    setChartDataset(dataset: Horoscope): void {
      const chartDataset = {
        data: [
          dataset.money,
          dataset.job,
          dataset.love,
          dataset.total,
          Math.floor(Math.random() * 5) + 1,
        ],
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderColor: 'rgba(255, 0, 0, 0.7)',
        label: this.targetName,
      }

      this.chartData = {
        labels: ['お金', '仕事', '恋愛', '総合', '特別点'],
        datasets: [chartDataset],
      }
    },

    async displayResult(): Promise<void> {
      const targetSign = this.getTargetSign(this.targetMonth, this.targetDay)

      if (targetSign === null) {
        this.errorMessage = '不正な日付です'
        return
      }

      this.displayChart()

      const datasets = await this.getApiCallResult()

      const dataset = this.getChartDataset(datasets, targetSign)

      if (dataset === undefined) return

      this.setDisplayContents(dataset)
      this.setChartDataset(dataset)

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
.sign-field
  text-align: center
  margin: 10px 0
</style>
