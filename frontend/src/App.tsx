import { Route, Routes } from "react-router-dom";
import {
  CatalogPage,
  HomePage,
  LoginPage,
  OrderDetailPage,
  OrderPage,
  RegistrationPage,
  UserPage,
} from "./pages";
import { ProtectedUserRoute } from "./hooks/protectedUserRoute";

const App = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login-page" />
      <Route element={<RegistrationPage />} path="/registration-page" />
      <Route element={<CatalogPage />} path="/catalog-page" />
      <Route element={<HomePage />} path="/" />

      <Route
        path="/order-page"
        element={
          <ProtectedUserRoute>
            <OrderPage />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/user-page"
        element={
          <ProtectedUserRoute>
            <UserPage />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedUserRoute>
            <OrderDetailPage />
          </ProtectedUserRoute>
        }
      />
    </Routes>
  );
};

export default App;
