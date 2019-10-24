<template>
  <div>
    <div class="input-field">
      <div class="input-name">
        <v-label :text="inputNameText" :width="inputLabelWidth"></v-label>
        <v-text-input @input="getTargetName"></v-text-input>
      </div>
      <div class="input-birthday">
        <v-label :text="inputBirthdayText" :width="inputLabelWidth"></v-label>
        <v-text-input @input="getTargetMonth"></v-text-input>
        <v-label :text="inputMonthText"></v-label>
        <v-text-input @input="getTargetDay"></v-text-input>
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
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js'
import { apiCall } from '../../libs/api-call'
import VChart from '../atoms/VChart.vue'
import VLabel from '../atoms/VLabel.vue'
import VTextInput from '../atoms/VTextInput.vue'
import VButton from '../atoms/VButton.vue'
import Constellation from '../../libs/constellation'

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
    getTargetName(value: string): void {
      this.targetName = value
    },

    getTargetMonth(value: string): void {
      this.targetMonth = value
    },

    getTargetDay(value: string): void {
      this.targetDay = value
    },

    checkDateLength(value: string): boolean {
      return value.length > 2
    },

    displayChart(): void {
      if (this.options.scale !== undefined) this.options.scale.display = true
    },

    async displayResult(): Promise<void> {
      const targetBirthday = `${this.targetMonth}-${this.targetDay}`
      const targetSign = Constellation.getConstellation(targetBirthday)

      if (targetSign === null) {
        this.errorMessage = '不正な日付です'
        return
      }

      this.displayChart()

      const response = await apiCall.fetchResult()
      const dataset = response.filter(item => {
        return item.sign === targetSign
      })

      this.sign = dataset[0].sign
      this.content = dataset[0].content

      const chartDataset: ChartDataSets = {
        data: [
          dataset[0].money,
          dataset[0].job,
          dataset[0].love,
          dataset[0].total,
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
