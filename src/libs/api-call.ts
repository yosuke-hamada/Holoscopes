import axios from 'axios'
import { Horoscope } from '../types/horoscope'

class ApiCall {
  async fetchResult(): Promise<Horoscope[]> {
    const url =
      'https://reverent-goodall-a91ac0.netlify.com/.netlify/functions/horoscope'
    try {
      const response = await axios.get(url)
      const resData = response.data

      resData.forEach((data: Horoscope) => {
        data.shopping = Math.floor(Math.random() * 5) + 1
        data.gambling = Math.floor(Math.random() * 3) + 1
      })

      return resData
    } catch (error) {
      return error
    }
  }
}

export const apiCall = new ApiCall()
