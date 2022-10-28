import dayjs, { Dayjs } from "dayjs";

export type DateType = Date | Dayjs | string;

export const formatDateKey = (date: DateType) => dayjs(date).format();

export const formatDayInMonth = (date: DateType) => dayjs(date).format("DD");
