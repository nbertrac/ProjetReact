import CarsForm from "../../core/component/forms/CarsForm";
import { useContext } from "react";
import { UserContext } from "../../core/component/contexts/AuthContext";
import { Navigate } from "react-router";

const AddCars = () => {
  const [user, setUser] = useContext(UserContext);
  if (user) return <CarsForm label="Ajout de voiture" labelButton="Ajouter" />;
  else return <Navigate to="404" replace />;
};
export default AddCars;
