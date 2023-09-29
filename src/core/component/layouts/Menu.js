import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
const Menu = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    setUser(undefined);
    sessionStorage.removeItem("USER");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Catalogue voitures</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
            <Link to={"/cars"} className="nav-link">
              Voir toutes les voitures
            </Link>
            {user ? (
              <Link to={"/cars/create"} className="nav-link">
                Ajouter un voiture
              </Link>
            ) : (
              ""
            )}
            {user ? (
              <>
                <p className="nav-link">{user?.lastname}</p>

                <Button size="sm" onClick={logout}>
                  Deconnexion
                </Button>
              </>
            ) : (
              <Link to={"/login"} className="nav-link">
                Se connecter
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
