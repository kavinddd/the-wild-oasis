import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { user, isAuthenticated, isLoading, isFetching } = useUser();

  console.log(user);

  // 3. if there is no authenticated suer, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isFetching && !isLoading) navigate("/login");
  }, [isAuthenticated, isFetching, isLoading, navigate]);

  // 2. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is a USEr, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
