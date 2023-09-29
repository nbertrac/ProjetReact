import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router";

const CarsForm = ({ label, labelButton, modifId = null, ...other }) => {
  const [carInfo, setCarInfo] = useState({
    model: "",
    brand: null,
    price: 0,
    date: new Date(),
    brandID: 0,
  });
  const [brands, setBrands] = useState([]);
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const submit = (ev) => {
    const form = ev.currentTarget;
    if (form.checkValidity() === false) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    carInfo.price = Number(carInfo.price);
    carInfo.brandID = Number(carInfo.brandID);
    setValidated(true);
    ev.preventDefault();
    if (modifId == null) {
      axios
        .post("https://formation.inow.fr/demo/api/v1/cars", carInfo)
        .then(() => {
          setTitle("Ajoutée avec succès!");
          setMessage("La voiture à été ajoutée");
          setColor("success");
          setShow(true);
          setTimeout(function () {
            navigate("/");
          }, 2000);
        })
        .catch((er) => {
          setTitle("Erreur lors de l'ajout");
          setMessage("La voiture n'a pas été ajoutée");
          setColor("danger");
          setShow(true);
          console.log(er);
        });
    } else {
      carInfo["id"] = modifId;
      axios
        .put(`https://formation.inow.fr/demo/api/v1/cars/${modifId}`, carInfo)
        .then(() => {
          setTitle("Modifiée avec succès!");
          setMessage("La voiture à été modifiée");
          setColor("success");
          setShow(true);
        })
        .catch((er) => {
          setTitle("Erreur lors de la modification");
          setMessage("La voiture n'a pas été modifiée");
          setColor("danger");
          setShow(true);
          console.log(er.response);
        });
    }
  };

  const changeFormField = (ev) => {
    const obj = { ...carInfo };
    if (ev.target.name == "date") {
      obj[ev.target.name] = new Date(ev.target.value)
        .toISOString()
        .substr(0, new Date(ev.target.value).toISOString().indexOf("."));
    } else obj[ev.target.name] = ev.target.value;
    setCarInfo(obj);
  };

  useEffect(() => {
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
      <h1>{label}</h1>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            name="model"
            type="text"
            required
            onChange={changeFormField}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez donner un nom.
          </Form.Control.Feedback>
          <Form.Label>Date de mise en circulation</Form.Label>
          <Form.Control
            name="date"
            type="date"
            required
            onChange={changeFormField}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez donner une date
          </Form.Control.Feedback>
          <Form.Label>Prix</Form.Label>
          <Form.Control
            name="price"
            type="number"
            required
            onChange={changeFormField}
          />
          <Form.Control.Feedback type="invalid">
            Veuillez donner un prix.
          </Form.Control.Feedback>
          <Form.Label>Marque</Form.Label>
          <Form.Control
            name="brandID"
            as="select"
            type="select"
            required
            onChange={changeFormField}>
            <option value="">Selectionner une marque</option>
            {brands.map((brand) => (
              <option value={brand.id}>{brand.name}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Veuillez choisir un marque
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          {labelButton}
        </Button>
      </Form>
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
export default CarsForm;
