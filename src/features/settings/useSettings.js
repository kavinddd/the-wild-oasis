import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data = {},
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const settings = {
    id: data.id,
    createdAt: data.created_at,
    breakfastPrice: data.breakfast_price,
    maxBookingLength: data.max_booking_length,
    maxGuestsPerBooking: data.max_guests_per_booking,
    minGuestsPerBooking: data.min_guests_per_booking,
  };

  return { isLoading, error, settings };
}
