import { Lookup } from "../hooks/useDaysInEU";
import dayjs from "dayjs";

export const createOverageLookup = (
  dateLookup: Lookup,
  daysAllowedInPeriod: number = 90,
  periodLengthInDays: number = 180
): Promise<Lookup> => {
  return new Promise((resolve) => {
    const overagesLookup: { [key: string]: Boolean } = {};
    const period: Boolean[] = new Array(periodLengthInDays);

    const processFirstDateInPeriod = () => {
      const firstDateInPeriod = period.shift();
      if (firstDateInPeriod) daysAllowedUsed--;
    };

    const processCurrentDate = () => {
      const formattedDate = dateCounter.format();
      const dateInLookup = formattedDate in dateLookup;
      period.push(dateInLookup);

      if (dateInLookup) daysAllowedUsed++;
      if (dateInLookup && daysAllowedUsed > daysAllowedInPeriod)
        overagesLookup[formattedDate] = true;
    };

    const daysSortedAscending = Object.keys(dateLookup).sort();
    const startDate = dayjs(daysSortedAscending[0]);
    const endDate = dayjs(daysSortedAscending[daysSortedAscending.length - 1]);

    let dateCounter = startDate;
    let daysAllowedUsed = 0;

    while (dateCounter.isSameOrBefore(endDate)) {
      processFirstDateInPeriod();
      processCurrentDate();

      dateCounter = dateCounter.add(1, "day");
    }

    resolve(overagesLookup);
  });
};
