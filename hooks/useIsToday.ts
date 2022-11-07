import dayjs, { Dayjs } from "dayjs";

export default function useIsToday() {
  const today = dayjs();

  return (date: Dayjs | string) => today.isSame(date, "day");
}
