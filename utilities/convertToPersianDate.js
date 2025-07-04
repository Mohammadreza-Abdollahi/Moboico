import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits: true });

export const convertToPersianDate = (date , format) => {
  return moment(date).format(format);
};
