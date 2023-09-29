import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
const Home = () => {
  const [brands, setBrands] = useState([]);

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
      <h1>HOME</h1>
      <CardGroup>
        {brands.map((brand) => (
          <Link
            key={brand?.id}
            to={`/brand/${brand.name}/${brand.image}/${brand.id}`}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`/${brand?.image}`} />
              <Card.Body>
                <Card.Title>{brand?.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </CardGroup>
    </div>
  );
};
export default Home;
