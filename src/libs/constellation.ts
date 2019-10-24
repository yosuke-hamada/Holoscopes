import * as moment from 'moment'

export default class Constellation {
  private static Aries = '牡羊座'
  private static Taurus = '牡牛座'
  private static Gemini = '双子座'
  private static Cancer = '蟹座'
  private static Leo = '獅子座'
  private static Virgo = '乙女座'
  private static Libra = '天秤座'
  private static Scorpio = '蠍座'
  private static Sagittarius = '射手座'
  private static Capricorn = '山羊座'
  private static Aquarius = '水瓶座'
  private static Pisces = '魚座'

  public static getConstellation(targetBirthday: string): string | null {
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

  private static convertHalfChar(target: string): string {
    return target.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
  }

  private static getMoment(date: string): moment.Moment {
    return moment(date, 'MM-DD')
  }
}
