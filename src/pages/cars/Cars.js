import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import CarsForm from "../../core/component/forms/CarsForm";
import { useContext } from "react";
import { UserContext } from "../../core/component/contexts/AuthContext";

const Cars = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [choosenCar, setChoosenCar] = useState("");
  const [deleteCar, deleteCarShow] = useState(false);
  const [modifCar, modifCarShow] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const deleteCarClose = () => {
    deleteCarShow(false);
  };
  const deleteCarOpen = (choosenCar) => {
    setChoosenCar(choosenCar);
    deleteCarShow(true);
  };
  const modifCarClose = () => {
    modifCarShow(false);
  };
  const modifCarOpen = (choosenCar) => {
    setChoosenCar(choosenCar);
    modifCarShow(true);
  };
  const deleteChoosenCar = () => {
    deleteCarClose();
    axios
      .delete(`https://formation.inow.fr/demo/api/v1/cars/${choosenCar}`)
      .then(() => {
        setTitle("Supprimer avec succès!");
        setMessage("La voiture à été supprimée");
        setColor("success");
        setShow(true);
      })
      .catch(() => {
        setTitle("Erreur de Suppression");
        setMessage("La voiture n'a pas été supprimée");
        setColor("danger");
        setShow(true);
      });
  };

  useEffect(() => {
    axios
      .get("https://formation.inow.fr/demo/api/v1/cars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((er) => {
        alert(er.message);
      });
    axios
      .get("https://formation.inow.fr/demo/api/v1/brands")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((er) => {
        alert(er.message);
      });
  }, []);
  return (
    <div>
      <h1>Liste des voitures</h1>
      <Modal show={deleteCar} onHide={deleteCarClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez vous vraiment supprimer cette voiture?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteCarClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={deleteChoosenCar}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modifCar} onHide={modifCarClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarsForm
            label="Formulaire de modification"
            labelButton="Modifier"
            modifId={choosenCar}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modifCarClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Marque</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car) => (
            <tr key={car.id}>
              <td>{car?.model}</td>
              <td>{brands.find((brand) => brand.id == car.brandID)?.name}</td>
              {user ? (
                <>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        modifCarOpen(car.id);
                      }}>
                      Modifier
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteCarOpen(car.id);
                      }}>
                      Supprimer
                    </Button>{" "}
                  </td>
                </>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer
        className="p-3"
        position="bottom-start"
        style={{ zIndex: 1, position: "fixed" }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          bg={color}
          autohide>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
export default Cars;
