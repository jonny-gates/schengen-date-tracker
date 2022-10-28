import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { Dates } from "../../../constants/dates";

import { usePopupMenu } from "../../../contexts/PopupMenuContext";

interface ControlBarProps {
  currentYear: any;
  decreaseYear: () => void;
  increaseYear: () => void;
  currentYearIndex: number;
}

export default function ControlBar({
  currentYear,
  decreaseYear,
  currentYearIndex,
  increaseYear,
}: ControlBarProps) {
  const { openNewTripMenu } = usePopupMenu();

  const handleOpenMenu = () => {
    openNewTripMenu();
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6">
      <h1 className="text-lg font-semibold text-gray-900">
        <time dateTime="2022">{currentYear.name}</time>
      </h1>
      <div className="flex items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex items-center justify-center rounded-l-md border border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={decreaseYear}
            disabled={currentYearIndex === 0}
          >
            <span className="sr-only">Previous year</span>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
          >
            {currentYear.name}
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300" />
          <button
            type="button"
            className="flex items-center justify-center rounded-r-md border border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            onClick={increaseYear}
            disabled={currentYearIndex === Dates.years.length - 1}
          >
            <span className="sr-only">Next year</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="ml-4 flex items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleOpenMenu}
          >
            Add trip
          </button>
        </div>
      </div>
    </header>
  );
}
