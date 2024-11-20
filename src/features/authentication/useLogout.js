import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: ({ email, password }) => logoutApi({ email, password }),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("Error ", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { logout, isLoggingOut };
}
