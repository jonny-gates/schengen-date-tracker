import { usePopupMenu } from "../../../contexts/PopupMenuContext";
import { useTrips } from "../../../contexts/TripsContext";
import Button from "../../button";

export default function Edit() {
  const { currentDay, currentTripId, close } = usePopupMenu();
  const { update, destroy } = useTrips();

  if (!currentDay || !currentTripId) return null;

  const handleMoveTripStart = () => {
    update(currentTripId, { startDate: currentDay.format() });
    close();
  };

  const handleMoveTripEnd = () => {
    update(currentTripId, { endDate: currentDay.format() });
    close();
  };

  const handleDeleteTrip = () => {
    destroy(currentTripId);
    close();
  };

  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
      <Button variant="secondary" onClick={handleMoveTripStart}>
        Move Trip Start Here
      </Button>
      <Button variant="secondary" onClick={handleMoveTripEnd}>
        Move Trip End Here
      </Button>
      <Button variant="error" onClick={handleDeleteTrip}>
        Remove Trip
      </Button>
    </div>
  );
}
