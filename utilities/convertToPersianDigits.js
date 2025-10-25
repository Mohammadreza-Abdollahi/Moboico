export const convertToPersianDigits = (number, comma = false) => {
  if (number == null) return "";

  const formattedNumber = comma
    ? Number(number).toLocaleString("en-US")
    : number.toString();

  return formattedNumber.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};
