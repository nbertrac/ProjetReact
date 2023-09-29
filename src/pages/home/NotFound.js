import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Cette page n'existe pas</h2>
      <Link to={"/"} className="btn btn-secondary">
        Retour a l'accueil
      </Link>
    </div>
  );
};
export default NotFound;
