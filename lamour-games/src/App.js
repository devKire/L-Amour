import "./styles.css";
import { Router } from "./router";
import Spinner from "./components/Spinner"; // Importe o Spinner
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Spinner /> : <Router />}
    </>
  );
}

export default App;
