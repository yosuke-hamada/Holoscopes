<template>
  <div>
    <div class="input-field">
      <div class="input-name">
        <v-label
          :text="inputNameText"
          :width="inputLabelWidth"
          :display="displayBlock"
        ></v-label>
        <v-text-input
          :display="displayBlock"
          :width="inputFieldWidth"
          @input="setTargetName"
        ></v-text-input>
      </div>
      <div class="input-birthday">
        <v-label
          :text="inputBirthdayText"
          :width="inputLabelWidth"
          :display="displayBlock"
        ></v-label>
        <div class="input-day-month">
          <div class="input-month">
            <v-text-input
              :display="displayBlock"
              :width="inputFieldWidth"
              @input="setTargetMonth"
            ></v-text-input>
            <div class="input-label">
              <v-label :text="inputMonthText" :display="displayBlock"></v-label>
            </div>
          </div>
          <div class="input-day">
            <v-text-input
              :display="displayBlock"
              :width="inputFieldWidth"
              @input="setTargetDay"
            ></v-text-input>
            <div class="input-label">
              <v-label :text="inputDayText" :display="displayBlock"></v-label>
            </div>
          </div>
        </div>
        <div>
          <v-label
            :text="showErrorMessage"
            :color="errorMessageColor"
          ></v-label>
          <v-label :text="errorMessage" :color="errorMessageColor"></v-label>
        </div>
      </div>
      <template v-if="isToggleButton">
        <div class="select-field">
          <v-label
            :display="displayBlock"
            :text="firstComparisonText"
            :width="inputLabelWidth"
          ></v-label>
          <v-select-field
            :display="displayBlock"
            :width="inputFieldWidth"
            :items="getDisplayConstellations"
            @click="setFirstComparison"
          ></v-select-field>
        </div>
        <div class="select-field">
          <v-label
            :display="displayBlock"
            :text="secondComparisonText"
            :width="inputLabelWidth"
          ></v-label>
          <v-select-field
            :display="displayBlock"
            :width="inputFieldWidth"
            :items="getDisplayConstellations"
            @click="setSecondComparison"
          ></v-select-field>
        </div>
      </template>
      <template v-if="isToggleButton">
        <div class="button-field">
          <div class="button-wrapper">
            <v-button
              :text="compareButtonText"
              :width="buttonWidth"
              :font-size="buttonFontSize"
              :font-family="fontFamily"
              :font-weight="fontWeightBold"
              :background-color="buttonBackGroundColor"
              :color="buttonColor"
              @click="compareResult"
            ></v-button>
          </div>
          <div class="button-wrapper">
            <v-button
              :text="againForecastButtonText"
              :width="buttonWidth"
              :font-size="buttonFontSize"
              :font-family="fontFamily"
              :font-weight="fontWeightBold"
              :background-color="buttonBackGroundColor"
              :color="buttonColor"
              :disabled="buttonDisabled"
              @click="displayResult"
            ></v-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="button-field">
          <div class="button-wrapper">
            <v-button
              :text="inputButtonText"
              :width="buttonWidth"
              :font-size="buttonFontSize"
              :font-family="fontFamily"
              :font-weight="fontWeightBold"
              :background-color="buttonBackGroundColor"
              :color="buttonColor"
              :disabled="buttonDisabled"
              @click="displayResult"
            ></v-button>
          </div>
        </div>
      </template>
    </div>
    <v-chart :chart-data="chartData" :options="options"></v-chart>
    <div class="content-field">
      <div class="sign-field">
        <v-label
          :text="sign"
          :font-size="signFontSize"
          :font-family="fontFamily"
          :line-height="signFontSize"
        ></v-label>
      </div>
      <v-label
        :text="content"
        :font-size="contentFontSize"
        :line-height="contentFontSize"
        :font-family="fontFamily"
      ></v-label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartOptions, ChartDataSets } from 'chart.js'
import { apiCall } from '../../libs/api-call'
import VChart from '../atoms/VChart.vue'
import VLabel from '../atoms/VLabel.vue'
import VTextInput from '../atoms/VTextInput.vue'
import VButton from '../atoms/VButton.vue'
import VSelectField from '../atoms/VSelectField.vue'
import { constellation } from '../../libs/constellation'
import { Horoscope } from '../../types/horoscope'
import { Constellation } from '../../types/constellation'

const displayChart = (options: ChartOptions): void => {
  if (options.scale !== undefined) options.scale.display = true
}

const getTargetConstellation = (
  month: string,
  day: string
): Constellation | null => {
  const targetBirthday = `${month}-${day}`
  return constellation.getConstellation(targetBirthday)
}

const getApiCallResult = (): Promise<Horoscope[]> => {
  return apiCall.fetchResult()
}

const getDataset = (
  datasets: Horoscope[],
  sign: string
): Horoscope | undefined => {
  return datasets.find(dataset => {
    return dataset.sign === sign
  })
}

const getChartDataset = (
  dataset: Horoscope,
  constellation: Constellation,
  targetName?: string
): ChartDataSets => {
  return {
    data: [
      dataset.money,
      dataset.job,
      dataset.love,
      dataset.total,
      Math.floor(Math.random() * 5) + 1,
    ],
    backgroundColor: constellation.backgroundColor,
    borderColor: constellation.borderColor,
    label: targetName || constellation.sign,
  }
}

export default Vue.extend({
  components: {
    VLabel,
    VChart,
    VTextInput,
    VButton,
    VSelectField,
  },
  data(): {
    chartData: ChartData
    chartDatasets: ChartDataSets[]
    content: string
    sign: string
    options: ChartOptions
    targetName: string
    targetMonth: string
    targetDay: string
    inputLabelWidth: string
    inputFieldWidth: string
    buttonWidth: string
    buttonFontSize: string
    buttonBackGroundColor: string
    buttonColor: string
    inputNameText: string
    inputBirthdayText: string
    inputMonthText: string
    inputDayText: string
    inputButtonText: string
    compareButtonText: string
    againForecastButtonText: string
    errorMessage: string
    errorMessageColor: string
    signFontSize: string
    selectedFirstComparison: Constellation
    selectedSecondComparison: Constellation
    firstComparisonText: string
    secondComparisonText: string
    displayBlock: string
    fontFamily: string
    fontWeightBold: string
    contentFontSize: string
  } {
    return {
      chartData: {},
      chartDatasets: [],
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
      inputFieldWidth: '100%',
      buttonWidth: '300px',
      buttonFontSize: '30px',
      buttonBackGroundColor: '#FFC107',
      buttonColor: '#ffffff',
      inputNameText: '名前',
      inputBirthdayText: '生年月日',
      inputMonthText: '月',
      inputDayText: '日',
      inputButtonText: '占う',
      compareButtonText: '比較する',
      againForecastButtonText: 'もう一度占う',
      errorMessage: '',
      errorMessageColor: '#d93025',
      signFontSize: '24px',
      selectedFirstComparison: {
        sign: '',
        backgroundColor: '',
        borderColor: '',
      },
      selectedSecondComparison: {
        sign: '',
        backgroundColor: '',
        borderColor: '',
      },
      firstComparisonText: '比較対象1',
      secondComparisonText: '比較対象2',
      displayBlock: 'block',
      fontFamily: '"Kaiti SC",sans-serif',
      fontWeightBold: 'bold',
      contentFontSize: '20px',
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
    getDisplayConstellations(): string[] {
      const constellations = constellation.getConstellationList()
      return constellations.map(item => {
        return item.sign
      })
    },
    isToggleButton(): boolean {
      if (this.options.scale !== undefined) {
        return this.options.scale.display || false
      }
      return false
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

    setDisplayContents(dataset: Horoscope): void {
      this.sign = `${dataset.sign}のあなた`
      this.content = dataset.content
    },

    setChartDataset(
      dataset: Horoscope,
      constellation: Constellation,
      targetName?: string
    ): void {
      this.chartDatasets = [
        ...this.chartDatasets,
        getChartDataset(dataset, constellation, targetName),
      ]

      this.chartData = {
        labels: ['お金', '仕事', '恋愛', '総合', '特別点'],
        datasets: this.chartDatasets,
      }
    },

    async displayResult(): Promise<void> {
      this.chartDatasets = []
      const targetConstellation = getTargetConstellation(
        this.targetMonth,
        this.targetDay
      )

      if (targetConstellation === null) {
        this.errorMessage = '不正な日付です'
        return
      }

      const datasets = await getApiCallResult()

      displayChart(this.options)

      const dataset = getDataset(datasets, targetConstellation.sign)

      if (dataset === undefined) return

      this.setDisplayContents(dataset)
      this.setChartDataset(dataset, targetConstellation, this.targetName)

      this.errorMessage = ''
    },

    async compareResult(): Promise<void> {
      this.chartDatasets = [this.chartDatasets[0]]

      const datasets = await getApiCallResult()

      const firstComparisonDataset = getDataset(
        datasets,
        this.selectedFirstComparison.sign
      )
      if (firstComparisonDataset !== undefined) {
        this.setChartDataset(
          firstComparisonDataset,
          this.selectedFirstComparison
        )
      }

      const secondComparisonDataset = getDataset(
        datasets,
        this.selectedSecondComparison.sign
      )
      if (secondComparisonDataset !== undefined) {
        this.setChartDataset(
          secondComparisonDataset,
          this.selectedSecondComparison
        )
      }
    },

    setFirstComparison(value: string): void {
      const constellations = constellation.getConstellationList()
      const targetConstellation = constellations.find((item: Constellation) => {
        return item.sign === value
      })
      if (targetConstellation === undefined) {
        this.selectedFirstComparison = {
          sign: '',
          backgroundColor: '',
          borderColor: '',
        }
        return
      }
      this.selectedFirstComparison = targetConstellation
    },

    setSecondComparison(value: string): void {
      const constellations = constellation.getConstellationList()
      const targetConstellation = constellations.find((item: Constellation) => {
        return item.sign === value
      })
      if (targetConstellation === undefined) {
        this.selectedSecondComparison = {
          sign: '',
          backgroundColor: '',
          borderColor: '',
        }
        return
      }
      this.selectedSecondComparison = targetConstellation
    },
  },
})
</script>
<style lang="sass" scoped>
.input-field
  padding: 20px
.input-name, .input-birthday
  margin: 40px auto 0 auto
  width: 30vw
.input-day-month
  display: flex
  justify-content: space-between
.input-month, .input-day
  display: inline-block
  width: 45%
.input-label
  text-align: right
  margin-top: 3px
.button-field
  margin-top: 30px
  text-align: center
.sign-field
  text-align: center
  margin: 10px 0
.select-field
  padding: 10px 0
  width: 30vw
  margin: auto
.button-wrapper
  margin-bottom: 10px
</style>
