import type { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

interface IProtectedUserRouteProps {
  children: ReactNode;
}

export const ProtectedUserRoute = ({ children }: IProtectedUserRouteProps) => {
  const { user } = useAppSelector((state) => state.delivery.users);

  if (!user) {
    return <Navigate to="/login-page" replace />;
  }

  return children;
};
