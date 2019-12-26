import * as moment from 'moment'
import { Constellation as Conste } from '../types/constellation'

class Constellation {
  private Aries: Conste = {
    sign: '牡羊座',
    backgroundColor: 'rgba(255,74,74,0.1)',
    borderColor: 'rgba(255,74,74,0.9)',
  }
  private Taurus: Conste = {
    sign: '牡牛座',
    backgroundColor: 'rgba(9,173,36,0.1)',
    borderColor: 'rgba(9,173,36,0.9)',
  }
  private Gemini: Conste = {
    sign: '双子座',
    backgroundColor: 'rgba(230,230,0,0.1)',
    borderColor: 'rgba(230,230,0,0.9)',
  }
  private Cancer: Conste = {
    sign: '蟹座',
    backgroundColor: 'rgba(123,125,112,0.1)',
    borderColor: 'rgba(123,125,112,0.9)',
  }
  private Leo: Conste = {
    sign: '獅子座',
    backgroundColor: 'rgba(250,126,30,0.1)',
    borderColor: 'rgba(250,126,30,0.9)',
  }
  private Virgo: Conste = {
    sign: '乙女座',
    backgroundColor: 'rgba(214,179,152,0.1)',
    borderColor: 'rgba(214,179,152,0.9)',
  }
  private Libra: Conste = {
    sign: '天秤座',
    backgroundColor: 'rgba(250,143,143,0.1)',
    borderColor: 'rgba(250,143,143,0.9)',
  }
  private Scorpio: Conste = {
    sign: '蠍座',
    backgroundColor: 'rgba(250,38,59,0.1)',
    borderColor: 'rgba(250,38,59,0.9)',
  }
  private Sagittarius: Conste = {
    sign: '射手座',
    backgroundColor: 'rgba(194,82,250,0.1)',
    borderColor: 'rgba(194,82,250,0.9)',
  }
  private Capricorn: Conste = {
    sign: '山羊座',
    backgroundColor: 'rgba(133,98,63,0.1)',
    borderColor: 'rgba(133,98,63,0.9)',
  }
  private Aquarius: Conste = {
    sign: '水瓶座',
    backgroundColor: 'rgba(5,232,240,0.1)',
    borderColor: 'rgba(5,232,240,0.9)',
  }
  private Pisces: Conste = {
    sign: '魚座',
    backgroundColor: 'rgba(20,12,240,0.1)',
    borderColor: 'rgba(20,12,240,0.9)',
  }

  public getConstellation(targetBirthday: string): Conste | null {
    const convertedBirthday = this.convertHalfChar(targetBirthday)
    const birthday = this.getMoment(convertedBirthday)
    switch (true) {
      case birthday.isBetween(this.getMoment('3-20'), this.getMoment('4-20')):
        return this.Aries
      case birthday.isBetween(this.getMoment('4-19'), this.getMoment('5-21')):
        return this.Taurus
      case birthday.isBetween(this.getMoment('5-20'), this.getMoment('6-22')):
        return this.Gemini
      case birthday.isBetween(this.getMoment('6-21'), this.getMoment('7-23')):
        return this.Cancer
      case birthday.isBetween(this.getMoment('7-22'), this.getMoment('8-23')):
        return this.Leo
      case birthday.isBetween(this.getMoment('8-22'), this.getMoment('9-23')):
        return this.Virgo
      case birthday.isBetween(this.getMoment('9-22'), this.getMoment('10-24')):
        return this.Libra
      case birthday.isBetween(this.getMoment('10-23'), this.getMoment('11-23')):
        return this.Scorpio
      case birthday.isBetween(this.getMoment('11-22'), this.getMoment('12-24')):
        return this.Sagittarius
      case birthday.isAfter(this.getMoment('12-23')) ||
        birthday.isBefore(this.getMoment('1-20')):
        return this.Capricorn
      case birthday.isBetween(this.getMoment('1-19'), this.getMoment('2-19')):
        return this.Aquarius
      case birthday.isBetween(this.getMoment('2-18'), this.getMoment('3-21')):
        return this.Pisces
      default:
        return null
    }
  }

  public getConstellationList(): Conste[] {
    return [
      this.Aries,
      this.Taurus,
      this.Gemini,
      this.Cancer,
      this.Leo,
      this.Virgo,
      this.Libra,
      this.Scorpio,
      this.Sagittarius,
      this.Capricorn,
      this.Aquarius,
      this.Pisces,
    ]
  }

  private convertHalfChar(target: string): string {
    return target.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
  }

  private getMoment(date: string): moment.Moment {
    return moment(date, 'MM-DD')
  }
}

export const constellation = new Constellation()
