var dayjs = require("dayjs");
var dayOfYear = require("dayjs/plugin/dayOfYear");
var isLeapYear = require("dayjs/plugin/isLeapYear");
var isoWeek = require("dayjs/plugin/isoWeek");
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

var fs = require("fs");

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);

const YEARS_SUPPORTED = [2021, 2022, 2023];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateYear = (year) => {
  // const daysInYear = currentYear.isLeapYear() ? 366 : 365;

  const months = MONTHS.map((month, index) => {
    return {
      name: month,
      days: generateDays(year, index),
    };
  });
  return {
    name: year,
    months,
  };
};

const generateDays = (year, monthIndex) => {
  const firstOfMonth = dayjs().year(year).month(monthIndex).date(1);
  const startDate =
    firstOfMonth.day() === 0
      ? firstOfMonth
      : firstOfMonth.subtract(firstOfMonth.day() - 1, "day");

  const endOfMonth = firstOfMonth.endOf("month");
  const endDate = endOfMonth.add(7 - endOfMonth.day(), "day");

  const currentMonthIndex = monthIndex;
  const days = [];

  let dayCounter = startDate;

  while (dayCounter.isSameOrBefore(endDate)) {
    const day = {
      date: dayCounter.format("YYYY-MM-DD"),
      isCurrentMonth: dayCounter.month() === currentMonthIndex,
      // isToday: dayjs().isSame(dayCounter, "day"),
      // isStartOfLastWeek: true,
      // isEndOfMonth: true,
      // isStartOfMonth: true,
      // isEndOfFirstWeek: true,
    };

    days.push(day);
    dayCounter = dayCounter.add(1, "day");
  }

  return days;
};

const generateDates = () => {
  const years = YEARS_SUPPORTED.map((year) => generateYear(year));

  return { years };
};

const writeToFile = (data) => {
  const json = JSON.stringify(data);
  fs.writeFile("myjsonfile.json", json, "utf8", () => {});
};

const result = generateDates();

writeToFile(result);
// console.log(result["years"][0]["months"][0]["days"]);

// result["years"][0]["months"].forEach((month) => {
//   const startDay = dayjs(month.days[0].date);
//   const endDay = dayjs(month.days.reverse()[0].date);
//   console.log(`${month.name} start: `, startDay.day());
//   console.log(`${month.name} end: `, endDay.day());
//   console.log(`${month.name} length: `, month.days.length);
// });

// console.log(result);
