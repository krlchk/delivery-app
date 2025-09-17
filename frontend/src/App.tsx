import { Route, Routes } from "react-router-dom";
import { CatalogPage, HomePage, LoginPage, RegistrationPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route element={<CatalogPage />} path="/catalog-page" />
      <Route element={<LoginPage />} path="/login-page" />
      <Route element={<RegistrationPage />} path="/registration-page" />
      <Route element={<HomePage />} path="/" />
    </Routes>
  );
};

export default App;
