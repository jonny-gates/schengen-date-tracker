import React, { createContext, useContext, useReducer } from "react";
import { FormValues as TripFormValues } from "../components/trips/form";
import tripsReducer, { Trip } from "../reducers/trips-reducer";

export type TripsContext = {
  trips: Trip[];
  create: (data: TripFormValues) => void;
  update: (id: string, data: Partial<TripFormValues>) => void;
  destroy: (id: string) => void;
  getTrip: (id: string) => Trip | null;
};

const defaultValues: TripsContext = {
  trips: [],
  create: (data) => {},
  update: (id, data) => {},
  destroy: (id) => {},
  getTrip: (id) => null,
};

export const TripsContext = createContext<TripsContext>(defaultValues);

export const TripsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [{ byId, allIds }, dispatch] = useReducer(tripsReducer, {
    byId: {},
    allIds: [],
  });

  const trips = allIds.map((id) => byId[id]);

  const getTrip = (id: string) => byId[id];

  const create = (data: TripFormValues) =>
    dispatch({ type: "CREATE", payload: { data } });

  const update = (id: string, data: Partial<TripFormValues>) =>
    dispatch({ type: "UPDATE", payload: { id, data } });

  const destroy = (id: string) =>
    dispatch({ type: "DESTROY", payload: { id } });

  return (
    <TripsContext.Provider value={{ trips, create, update, getTrip, destroy }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => useContext(TripsContext);
