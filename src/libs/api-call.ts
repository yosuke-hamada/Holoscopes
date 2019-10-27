import axios from 'axios'
import { Horoscope } from '../types/horoscope'

class ApiCall {
  async fetchResult(): Promise<Horoscope[]> {
    const url = '.netlify/functions/horoscope'
    try {
      const response = await axios.get(url)
      response.data
      return response.data
    } catch (error) {
      return error
    }
  }
}

export const apiCall = new ApiCall()
