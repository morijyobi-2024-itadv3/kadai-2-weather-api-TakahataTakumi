export type TypeResponse = {
  pref: string
  area: string
  today: {
    weather: string
    mintemp: string
    maxtemp: string | '-'
  }
  tomorrow: {
    weather: string
    mintemp: string
    maxtemp: string
  }
}
