import dayjs, { Dayjs } from "dayjs";
import { Lookup } from "../hooks/useDaysInEU";
import { Trip } from "../reducers/trips-reducer";

const createTripLookup = (
  startDate: Dayjs,
  endDate: Dayjs,
  lookupValue: string
) => {
  let dateCounter = startDate;
  const dateRange: Lookup = {};

  while (dateCounter.isSameOrBefore(endDate)) {
    const key = dateCounter.format();
    dateRange[key] = lookupValue;

    dateCounter = dateCounter.add(1, "day");
  }

  return dateRange;
};

export const createDateLookup = (trips: Trip[]): Promise<Lookup> => {
  return new Promise((resolve) => {
    const dateLookup: Lookup = trips.reduce((acc, trip) => {
      const startDate = dayjs(trip.startDate);
      const endDate = dayjs(trip.endDate);

      const tripLookup = createTripLookup(startDate, endDate, trip.id);
      return {
        ...acc,
        ...tripLookup,
      };
    }, {});

    resolve(dateLookup);
  });
};
