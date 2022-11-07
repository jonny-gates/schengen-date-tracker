import Month from "./month";
import Day from "./day";
import dayjs from "dayjs";
import { useTrips } from "../../contexts/TripsContext";
import useDaysInEU from "../../hooks/useDaysInEU";
import useIsToday from "../../hooks/useIsToday";

type Year = {
  name: string | number;
  months: Month[];
};

type Month = {
  name: string;
  days: Day[];
};

type Day = {
  date: string;
};

export interface CalendarProps {
  year: Year;
}

export default function Calendar({ year }: CalendarProps) {
  const { trips } = useTrips();
  const { daysInEU, overages } = useDaysInEU(trips);
  const isToday = useIsToday();

  console.log("Current day: ", dayjs().format());

  const renderDays = (days: any[]) => {
    const isStartOfLastWeek = (index: number) => index === days.length - 7;
    const isEndOfMonth = (index: number) => index === days.length - 1;
    const isStartOfMonth = (index: number) => index === 0;
    const isEndOfFirstWeek = (index: number) => index === 6;

    return days.map((day: any, dayIdx: number) => {
      console.log(isToday(day.date));

      const lookupKey = dayjs(day.date).format();

      const data = {
        ...day,
        isStartOfLastWeek: isStartOfLastWeek(dayIdx),
        isStartOfMonth: isStartOfMonth(dayIdx),
        isEndOfFirstWeek: isEndOfFirstWeek(dayIdx),
        isEndOfMonth: isEndOfMonth(dayIdx),
        isToday: isToday(day.date),
        isInEU: !!daysInEU[lookupKey],
        isOverage: overages[lookupKey],
        tripId: daysInEU[lookupKey],
      };

      if (data.isToday) {
        // console.log("Formula result: ", today.isSame(dayjs(day.date), "day"));
        // console.log("Day: ", today.format());
        // console.log("Compare Day: ", dayjs(day.date).format());
      }

      return <Day day={data} key={dayIdx} />;
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        {year.months.map(({ name, days }) => (
          <Month name={name} key={name}>
            {renderDays(days)}
          </Month>
        ))}
      </div>
    </div>
  );
}
