import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <AllRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
