import dayjs, { Dayjs } from "dayjs";
import React, { createContext, useContext, useState } from "react";

export type PopupMenuContext = {
  isOpen: Boolean;
  currentDay: Dayjs | null;
  currentTripId: string | null;
  openEditTripMenu: (day: Dayjs, tripId: string | undefined) => void;
  openNewTripMenu: (startDay?: Dayjs) => void;
  close: () => void;
};

const defaultValues: PopupMenuContext = {
  currentDay: null,
  currentTripId: null,
  isOpen: false,
  openEditTripMenu: () => {},
  openNewTripMenu: () => {},
  close: () => {},
};

export const PopupMenuContext = createContext<PopupMenuContext>(defaultValues);

export const PopupMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTripId, setCurrentTripId] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<Dayjs | null>(null);

  const openEditTripMenu = (
    day: Dayjs | undefined,
    tripId: string | undefined
  ) => {
    setIsOpen(true);
    setCurrentTripId(tripId ? tripId : null);
    setCurrentDay(day ? day : null);
  };

  const openNewTripMenu = (startDay: Dayjs | undefined) => {
    setIsOpen(true);
    setCurrentDay(startDay ? startDay : null);
  };

  const close = () => {
    setIsOpen(false);
    setCurrentTripId(null);
    setCurrentDay(null);
  };

  return (
    <PopupMenuContext.Provider
      value={{
        isOpen,
        openEditTripMenu,
        openNewTripMenu,
        close,
        currentTripId,
        currentDay,
      }}
    >
      {children}
    </PopupMenuContext.Provider>
  );
};

export const usePopupMenu = () => useContext(PopupMenuContext);
