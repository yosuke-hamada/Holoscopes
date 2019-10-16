import axios from 'axios'
import * as moment from 'moment'

interface Horoscope {
  content: string
  item: string
  money: number
  total: number
  job: number
  color: string
  day: number
  love: number
  rank: number
  sign: string
}

class ApiCall {
  async fetchResult(): Promise<Horoscope> {
    const baseUrl = 'api/horoscope/free/'
    const today = moment().format('YYYY/MM/DD')
    const url = `${baseUrl}${today}`
    try {
      const response = await axios.get(url)
      const result = response.data.horoscope[today]
      console.log(response)
      return result
    } catch (error) {
      return error
    }
  }
}

export const apiCall = new ApiCall()
