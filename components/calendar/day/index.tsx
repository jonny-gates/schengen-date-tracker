import dayjs from "dayjs";
import { usePopupMenu } from "../../../contexts/PopupMenuContext";
import { formatDateKey, formatDayInMonth } from "../../../utilities/formatDate";

export type Day = {
  tripId?: string | undefined;
  date: string;
  isCurrentMonth?: Boolean | undefined;
  isToday?: Boolean | undefined;
  isStartOfLastWeek?: Boolean;
  isEndOfMonth?: Boolean;
  isStartOfMonth?: Boolean;
  isEndOfFirstWeek?: Boolean;
  isInEU?: Boolean;
  isOverage?: Boolean;
};

export interface DayProps {
  day: Day;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Day({ day }: DayProps) {
  const { openEditTripMenu, openNewTripMenu } = usePopupMenu();

  const isToday = () => {
    const today = dayjs();
    return dayjs(day.date).isSame(today, "day");
  };

  const dayColor = () => {
    if (!day.isCurrentMonth) {
      if (isToday() || day.isInEU || day.isOverage)
        return "font-semibold text-white bg-gray-200";
    }
    if (isToday()) return "font-semibold text-white bg-indigo-600";
    if (day.isOverage) return "font-semibold text-white bg-red-700";
    if (day.isInEU) return "font-semibold text-white bg-blue-500";
  };

  const handleClick = () => {
    const currentDay = dayjs(day.date);
    day.tripId
      ? openEditTripMenu(currentDay, day.tripId)
      : openNewTripMenu(currentDay);
  };

  const dateKey = formatDateKey(day.date);
  const dayDate = formatDayInMonth(day.date);

  return (
    <button
      key={dateKey}
      type="button"
      className={classNames(
        day.isCurrentMonth
          ? "bg-white text-gray-900"
          : "bg-gray-50 text-gray-400",
        day.isStartOfMonth && "rounded-tl-lg",
        day.isEndOfFirstWeek && "rounded-tr-lg",
        day.isStartOfLastWeek && "rounded-bl-lg",
        day.isEndOfMonth && "rounded-br-lg",
        "py-1.5 hover:bg-gray-100 focus:z-10"
      )}
      onClick={handleClick}
    >
      <time
        dateTime={dateKey}
        className={classNames(
          dayColor(),
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
        )}
      >
        {dayDate}
      </time>
    </button>
  );
}
