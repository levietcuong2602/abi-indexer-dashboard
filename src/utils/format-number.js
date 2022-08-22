import moment from "moment";

// Add dot separate number, for example: 1000 => 1.000
export const formatNumber = (num) => {
  if (!num) return 0;
  const THREE_DIGITS_REGEX = /(\d)(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(THREE_DIGITS_REGEX, "$1,");
};

export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const abbreviateNumber = (n, fixed = 2) => {
  if (n < 1e3) return formatNumber(n);
  if (n >= 1e3 && n < 1e6) return formatNumber(+(n / 1e3).toFixed(fixed)) + "K";
  if (n >= 1e6 && n < 1e9) return formatNumber(+(n / 1e6).toFixed(fixed)) + "M";
  if (n >= 1e9 && n < 1e12) return formatNumber(+(n / 1e9).toFixed(fixed)) + "B";
  if (n >= 1e12) return formatNumber(+(n / 1e12).toFixed(fixed)) + "T";
};

export const diffTime = (fromTime, toTime, unitOfTime = "second") => {
  return moment(toTime).diff(moment(fromTime), unitOfTime);
};
