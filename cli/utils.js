/**
 * pads zero or specified character to the left of number
 * if digits in number are less than the specified width
 * @param {number} num number to be padded
 * @param {number} width number of digits to show
 * @param {string} char character to be padded
 */
function pad(num, width, char) {
  char = char || "0";
  num = num + "";
  return num.length >= width
    ? num.toString(10).slice(num.length - width)
    : new Array(width - num.length + 1).join(char) + num;
}

/**
 * formate date to readable string
 * @param {Date|string} date date object or ISO format date string
 */
function formatDate(date) {
  const d = new Date(date);

  const day = pad(d.getDate(), 2);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][d.getMonth()];

  const year = pad(d.getFullYear(), 2);

  const _hours = d.getHours();
  const hours = pad(_hours > 12 ? _hours - 12 : _hours, 2);
  const minutes = pad(d.getMinutes(), 2);
  const seconds = pad(d.getSeconds(), 2);

  const meridiem = _hours < 12 ? "AM" : "PM";

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} ${meridiem}`;
}

module.exports = {
  formatDate
};
