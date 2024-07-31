import moment from "moment-timezone"
import "moment/locale/vi"

const TIME_ZONE = "Asia/Ho_Chi_Minh"

export const formatDate = (date: Date | string, format = "YYYY-MM-DD") => {
  return moment(date).tz(TIME_ZONE).locale("vi").format(format)
}

export const timezoneDate = (date: Date | string | number) => {
  return moment(date).tz(TIME_ZONE).toDate()
}
