import { usePopupMenu } from "../../contexts/PopupMenuContext";
import { useTrips } from "../../contexts/TripsContext";
import Modal from "../modal";
import New from "./bodies/New";
import Edit from "./bodies/Edit";

export default function PopupMenu() {
  const { isOpen, close, currentTripId } = usePopupMenu();
  const { getTrip } = useTrips();

  const trip = currentTripId ? getTrip(currentTripId) : null;

  const modalTitle = () =>
    trip ? `Edit trip to ${trip.country}` : "Add new trip";

  return (
    <Modal isOpen={isOpen} onClose={close} title={modalTitle()}>
      {trip ? <Edit /> : <New />}
    </Modal>
  );
}
