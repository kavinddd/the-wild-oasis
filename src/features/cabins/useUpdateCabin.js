import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertCabin as upsertCabinApi } from "../../services/apiCabins";

import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ id, newCabin }) => upsertCabinApi(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCabin };
}
