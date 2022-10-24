import { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { FormValues as TripFormValues } from "../components/trips/form";
import parseDates from "../utilities/parseTripDates";

export type Trip = {
  startDate: Dayjs;
  endDate: Dayjs;
  country: string;
  id: string;
};

type TripsState = {
  byId: { [key: string]: Trip };
  allIds: string[];
};

type TripsAction =
  | { type: "CREATE"; payload: { data: TripFormValues } }
  | { type: "UPDATE"; payload: { id: string; data: Partial<TripFormValues> } }
  | { type: "DESTROY"; payload: { id: string } };

export default function tripsReducer(
  state: TripsState = { byId: {}, allIds: [] },
  action: TripsAction
): TripsState {
  switch (action.type) {
    case "CREATE": {
      const id = uuidv4();
      const { data } = action.payload;
      return {
        byId: {
          ...state.byId,
          [id]: { ...parseDates(data), id },
        },
        allIds: [...state.allIds, id],
      };
    }
    case "UPDATE": {
      const { id, data } = action.payload;
      const trip = state.byId[id];

      return {
        byId: {
          ...state.byId,
          [id]: { ...trip, ...parseDates(data) },
        },
        allIds: state.allIds,
      };
    }
    case "DESTROY": {
      const { id: idToDelete } = action.payload;

      const newById = state.byId;
      delete newById[idToDelete];

      const newAllIds = state.allIds.filter((id) => id !== idToDelete);

      return { byId: newById, allIds: newAllIds };
    }
    default:
      return state;
  }
}
