import type { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

interface IProtectedAdminRoute {
  children: ReactNode;
}

export const ProtectedAdminRoute = ({ children }: IProtectedAdminRoute) => {
  const { user } = useAppSelector((state) => state.delivery.users);
  if (!user) {
    <Navigate to="/login-page" replace />;
  }
  if (user?.role !== "admin") {
    <Navigate to="/" replace />;
  }
  return children;
};
