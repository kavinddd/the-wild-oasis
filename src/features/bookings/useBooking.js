import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export function useBooking() {
  const { bookingId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  const booking = useMemo(
    () =>
      data !== undefined
        ? {
            ...data,
            startDate: data.start_date,
            endDate: data.end_date,
            numNights: data.num_nights,
            numGuests: data.num_guests,
            createdAt: data.created_at,
            cabinPrice: data.cabin_price,
            extrasPrice: data.extras_price,
            totalPrice: data.total_price,
            isPaid: data.is_paid,
          }
        : undefined,

    [data],
  );

  return { isLoading, error, booking };
}
