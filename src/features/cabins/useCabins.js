import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data = [], // default value is empty array
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabins = data.map((it) => ({
    ...it,
    maxCapacity: it.max_capacity,
    regularPrice: it.regular_price,
  }));

  return { isLoading, error, cabins };
}
