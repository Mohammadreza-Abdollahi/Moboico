export const convertToPersianDigits = (number) => {
  return number.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};