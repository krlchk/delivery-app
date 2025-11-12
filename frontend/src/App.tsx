import { Route, Routes } from "react-router-dom";
import {
  CatalogPage,
  HomePage,
  LoginPage,
  OrderDetailPage,
  OrderPage,
  ProductDetailPage,
  RegistrationPage,
  UserPage,
} from "./pages";
import { ProtectedUserRoute } from "./hooks/protectedUserRoute";
import { ProtectedAdminRoute } from "./hooks/protectedAdminRoute";

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
      <Route
        path="/products/:id"
        element={
          <ProtectedAdminRoute>
            <ProtectedUserRoute>
              <ProductDetailPage />
            </ProtectedUserRoute>
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
