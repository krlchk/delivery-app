import { Route, Routes } from "react-router-dom";
import {
  CatalogPage,
  HomePage,
  LoginPage,
  OrderPage,
  RegistrationPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login-page" />
      <Route element={<RegistrationPage />} path="/registration-page" />
      <Route element={<CatalogPage />} path="/catalog-page" />
      <Route element={<OrderPage />} path="/order-page" />
      <Route element={<HomePage />} path="/" />
    </Routes>
  );
};

export default App;
