import { useQuery } from "@tanstack/react-query";
import { getCurrentuser as getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === "authenticated";

  return {
    user,
    isAuthenticated,
    isLoading,
    isFetching,
  };
}
