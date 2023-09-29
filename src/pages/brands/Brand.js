import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";

const Brand = () => {
  const { id, name, image } = useParams();
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios
      .get(`https://formation.inow.fr/demo/api/v1/cars`)
      .then((res) => {
        res.data = res.data.filter((car) => car.brandID == id);
        setCars(res.data);
      })
      .catch((er) => {
        alert(er.message);
      });
  }, [id]);

  return (
    <div>
      <h1>{name}</h1>
      <img src={`/${image}`} alt={`logo ${name}`} />
      <h2>Modeles de voitures :</h2>
      <CardGroup>
        {cars?.map((car) => (
          <Card key={car.id} style={{ width: "18rem" }}>
            <Card.Header>{car?.model}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Prix : {car?.price} €</ListGroup.Item>
              <ListGroup.Item>
                Date de circulation : {car?.dateOfCirculation}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default Brand;
