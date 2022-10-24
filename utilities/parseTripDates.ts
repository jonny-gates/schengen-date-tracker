import { FormValues } from "../components/trips/form";
import dayjs from "dayjs";

const DATE_FIELD_NAMES = ["startDate", "endDate"];

const parseTripDates = (values: Partial<FormValues>): any =>
  Object.keys(values).reduce((acc, key) => {
    return {
      ...acc,
      [key]: DATE_FIELD_NAMES.includes(key) ? dayjs(values[key]) : values[key],
    };
  }, {});

export default parseTripDates;
