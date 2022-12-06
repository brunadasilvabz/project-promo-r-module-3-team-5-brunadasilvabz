/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import alohomoraLogo from "../images/card.png";
import adalabLogo from "../images/adalab.png";
//STYLES
// import "../styles/core/_reset.scss";
import "../styles/main.scss";
//COMPONENTS
import Api from "../services/Api";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import Landing from "./Landing";
import ls from "../services/LocalStorage";

function App() {
  // Con esta línea le estamos diciendo que nos muestre lo guardado en el LocalStorage,'userDataLs'(lo he guardado en unas líneas más abajo en un useEffect). Si tiene algo guardado en el LocalStorage, que lo enseñe, en cambio, si está vacío, nos muestre nuestro valor inicial, que es nuestro objeto vacío.
  const [userData, setUserData] = useState(
    ls.get("userDataLs", {
      palette: "1",
      name: "",
      job: "",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Stray_calico_cat_near_Sagami_River-01.jpg/640px-Stray_calico_cat_near_Sagami_River-01.jpg",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    })
  );

  //Nueva variable estado para guardar dataResult
  const [dataResult, setDataResult] = useState(undefined);
  //Variable estado para los collapsables
  const [collapsable, setCollapsable] = useState("Design");

  // hago click en form y las demas tienen que ocultarse. Cambiamos su variable estado.
  const handleForm = () => {
    setCollapsable("Form");
  };

  const handleDesign = () => {
    setCollapsable("Design");
  };

  const handleShare = () => {
    setCollapsable("Share");
  };

  const handleInput = (input, value) => {
    setUserData({
      ...userData,
      [input]: value,
    });
  };

  //  USE EFFECT PARA EL LOCAL STORAGE

  // Usamos useEffect para guardar los datos en el local storage
  // Cuando React renderice y pinte el HTML en la página ejecutará este useEffect
  useEffect(() => {
    // Guardamos objeto data en el local storage.
    ls.set("userDataLs", userData);
    // Aquí estamos llamando a nuestra función del fichero LocalStorage.Le estamos pasando como parámetro nuestro userData:
    /*
        const set = (key, value) => {
        const localStorageData = JSON.stringify(value);
        localStorage.setItem(key, localStorageData);
  };*/
    // Se ejecuta cuando nuestra varible estado se modifica. Por eso lo metemos en estos corchetes.
  }, [userData]);

  //FALTA CONECTAR CON FUNCIÓN HANDLEDRAFT EN RESET.JS
  const handleReset = () => {
    setUserData({
      name: "",
      palette: "1",
      job: "",
      photo: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    });
  };

  const handleCreateCard = () => {
    Api(userData).then((data) => {
      setDataResult(data);
      // La respuesta del servidor. Necesitamos guardarla en una variable estado para luego pintarla html.
    });
  };

  return (
    <div className="App">
      <Header image={alohomoraLogo}></Header>
      <Routes>
        <Route path="/" element={<Landing alohomoraLogo={alohomoraLogo} />} />
        <Route
          path="/card"
          element={
            <Card
              handleReset={handleReset}
              handleInput={handleInput}
              handleDesign={handleDesign}
              handleForm={handleForm}
              handleCreateCard={handleCreateCard}
              handleShare={handleShare}
              userData={userData}
              dataResult={dataResult}
              collapsable={collapsable}
            />
          }
        />
      </Routes>
      <Footer image={adalabLogo}></Footer>
    </div>
  );
}

export default App;
