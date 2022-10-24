import CalendarComponent from "../components/calendar";
import { Dates } from "../constants/dates";
import { useState } from "react";
import { TripsContextProvider } from "../contexts/TripsContext";
import ControlBar from "../components/calendar/control-bar";
import { PopupMenuProvider } from "../contexts/PopupMenuContext";
import PopupMenu from "../components/popup-menu";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(1);
  const currentYear = Dates.years[currentYearIndex];

  const increaseYear = () => {
    setCurrentYearIndex(currentYearIndex + 1);
  };

  const decreaseYear = () => {
    setCurrentYearIndex(currentYearIndex - 1);
  };

  return (
    <TripsContextProvider>
      <PopupMenuProvider>
        <ControlBar
          increaseYear={increaseYear}
          decreaseYear={decreaseYear}
          currentYearIndex={currentYearIndex}
          currentYear={currentYear}
        />
        <CalendarComponent year={currentYear} />
        <PopupMenu />
      </PopupMenuProvider>
    </TripsContextProvider>
  );
};

export default Home;
