import { Navigate } from "react-router-dom";
import Home from "../components/Home";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Home /> : <Navigate to="/"/>
};

export default ProtectedRoutes;