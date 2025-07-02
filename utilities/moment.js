import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits: true });

export const convertToPerisan = (date) => {
  return moment(date).format("jDD  jMMMM  jYYYY");
};
