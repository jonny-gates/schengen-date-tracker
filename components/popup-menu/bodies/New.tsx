import { Dayjs } from "dayjs";
import { usePopupMenu } from "../../../contexts/PopupMenuContext";
import { useTrips } from "../../../contexts/TripsContext";
import TripForm, { FormValues as TripFormValues } from "../../trips/form";

const formatDateForForm = (date: Dayjs) => date.format("YYYY-MM-DD");

export default function New() {
  const { create } = useTrips();
  const { close, currentDay } = usePopupMenu();

  const handleCreate = (values: TripFormValues) => {
    create(values);
    close();
  };

  const defaultValues = currentDay
    ? {
        startDate: formatDateForForm(currentDay),
        endDate: formatDateForForm(currentDay.add(1, "day")),
        country: "",
      }
    : null;

  return (
    <TripForm
      onSubmit={handleCreate}
      defaultValues={defaultValues}
      onCancel={close}
    />
  );
}
