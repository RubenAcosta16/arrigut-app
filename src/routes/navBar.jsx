import { Link } from "react-router-dom";

const navbar = ({ children }) => {
  return (
    <div>
      <nav>
        <Link to="/signout">Cerrar sesion</Link>
      </nav>

      {children}
    </div>
  );
};

export default navbar;
