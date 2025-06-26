import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "@/components/ui/sonner";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { useEffect } from "react";
import { checkAuth } from "./reducers/authSlice";
import { Spinner } from "./components/ui/spinner";

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-lvh w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <AllRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
