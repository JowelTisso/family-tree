import { useAppSelector } from "@/store/hook";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  return authenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
