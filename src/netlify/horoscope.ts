import axios from 'axios'
import * as moment from 'moment'
import { Horoscope } from '../types/horoscope'

async function fetchHoroscope(): Promise<Horoscope[]> {
  const baseUrl = 'http://api.jugemkey.jp/api/horoscope/free/'
  const today = moment().format('YYYY/MM/DD')
  const url = `${baseUrl}${today}`

  try {
    const response = await axios.get(url)
    const result = response.data.horoscope[today]
    return result
  } catch (error) {
    return error
  }
}

export async function handler(): Promise<object> {
  const result = await fetchHoroscope()
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json charset = utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result),
  }
}
