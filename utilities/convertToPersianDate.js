import moment from "moment-jalaali";
import "moment-timezone";

moment.loadPersian({ usePersianDigits: true });

export const convertToPersianDate = (date, format) => {
  return moment.utc(date).tz("Asia/Tehran").format(format);
};
