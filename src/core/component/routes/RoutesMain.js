import { Route, Routes, Navigate } from "react-router";
import Home from "../../../pages/home/Home";
import Cars from "../../../pages/cars/Cars";
import Brand from "../../../pages/brands/Brand";
import AddCars from "../../../pages/cars/AddCars";
import Login from "../../../pages/authentication/Login";
import NotFound from "../../../pages/home/NotFound";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cars">
        <Route index caseSensitive element={<Cars />} />
        <Route path="create" caseSensitive element={<AddCars />} />
      </Route>
      <Route path="/brand/:name/:image/:id" element={<Brand />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
};

export default RoutesMain;
