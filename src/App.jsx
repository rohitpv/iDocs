import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import AlertContext from "./context/alert/AlertContext";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <AlertContext.Provider value={{ showAlert }}>
        <NoteState>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <Outlet></Outlet>
        </NoteState>
      </AlertContext.Provider>
    </>
  );
}

export default App;

