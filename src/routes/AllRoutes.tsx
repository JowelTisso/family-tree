import NotFound from "@/components/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
