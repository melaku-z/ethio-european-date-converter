const oneHour = 60 * 60 * 1000
export const oneDay = 24 * oneHour
export const oneYear = 365 * oneDay
const oneLeapYear = 366 * oneDay
export const fourYears = 3 * oneYear + oneLeapYear

export const globalTimeDifference =
  new Date('December 9, 2012').getTime() - new Date('April 1, 2005').getTime()

export const minEurDate = new Date(1900, 2, 1)
export const maxEurDate = new Date(2100, 1, 1)
