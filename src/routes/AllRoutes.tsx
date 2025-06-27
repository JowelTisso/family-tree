import NotFound from "@/components/not-found";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import RootLayout from "@/pages/RootLayout";
import Tree from "@/pages/Tree";
import About from "@/pages/About";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Tree />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
