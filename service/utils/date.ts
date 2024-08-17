import { format, parseISO } from 'date-fns'

import DATE_FORMAT_STRING from '../constants/date-format-string'

type DateFormatType = keyof typeof DATE_FORMAT_STRING

export default function formatDate(date: Date | string, type: DateFormatType = 'DEFAULT') {
  const dateFormatString = DATE_FORMAT_STRING[type]
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, dateFormatString)
}
