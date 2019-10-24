import axiosBase from 'axios'
import * as moment from 'moment'
import { Horoscope } from '../types/horoscope'

class ApiCall {
  async fetchResult(): Promise<Array<Horoscope>> {
    const baseUrl = 'api/horoscope/free/'
    const today = moment().format('YYYY/MM/DD')
    const axios = axiosBase.create({
      proxy: {
        host: '163.44.191.61',
        port: 80,
      },
    })
    const url = `${baseUrl}${today}`
    try {
      const response = await axios.get(url)
      const result = response.data.horoscope[today]
      return result
    } catch (error) {
      return error
    }
  }
}

export const apiCall = new ApiCall()
