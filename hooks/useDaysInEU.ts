import { useEffect, useState } from "react";

import dayjs from "dayjs";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import { Trip } from "../reducers/trips-reducer";
import { createDateLookup } from "../utilities/createDateLookup";
import { createOverageLookup } from "../utilities/createOverageLookup";

dayjs.extend(isSameOrBefore);

export type Lookup = {
  [key: string]: Boolean | string;
};

export default function useDaysInEU(trips: Trip[]) {
  const [daysInEU, setDaysInEU] = useState<Lookup>({});
  const [overages, setOverages] = useState<Lookup>({});

  const calculateDates = async (trips: Trip[]) => {
    const dateLookup = await createDateLookup(trips);
    const overageLookup = await createOverageLookup(dateLookup);

    setDaysInEU(dateLookup);
    setOverages(overageLookup);
  };

  useEffect(() => {
    calculateDates(trips);
  }, [trips]);

  return { daysInEU, overages };
}
