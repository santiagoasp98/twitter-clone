export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

export const currentYear = new Date().getFullYear()
export const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
