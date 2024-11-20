import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(
    `
    id,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    status,
    total_price,
    cabins(name),
    guests(full_name, email)`,
    { count: "exact" },
  );

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const fromIdx = (page - 1) * PAGE_SIZE;
    const toIdx = fromIdx + PAGE_SIZE;
    query = query.range(fromIdx, toIdx);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  const booking = {
    ...data,
    id: data.id,
    createdAt: data.created_at,
    startDate: data.start_date,
    endDate: data.end_date,
    numNights: data.num_nights,
    numGuests: data.num_guests,
    cabinPrice: data.cabin_price,
    extrasPrice: data.extras_price,
    totalPrice: data.total_price,
    status: data.status,
    hasBreakfast: data.has_breakfast,
    isPaid: data.is_paid,
    observations: data.observations,
  };

  return booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data.map((it) => ({
    createdAt: it.created_at,
    totalPrice: it.total_price,
    extrasPrice: it.extras_price,
  }));
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data.map((it) => ({
    createdAt: it.created_at,
    startDate: it.start_date,
    endDate: it.end_date,
    numNights: it.num_nights,
    numGuests: it.num_guests,
    cabinPrice: it.cabin_price,
    extrasPrice: it.extras_price,
    totalPrice: it.total_price,
    status: it.status,
    hasBreakfast: it.has_breakfast,
    isPaid: it.is_paid,
    observations: it.observations,
    cabinId: it.cabin_id,
    guestId: it.guest_id,
  }));
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
