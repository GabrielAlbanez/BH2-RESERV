import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TemaProvider from "./common/context/Tema";
import TypeUserProvider from "./common/context/typeUserCadastro"; // Corrigido para TypeUserProvider

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <TemaProvider>
      <TypeUserProvider> 
        <App />
      </TypeUserProvider>
    </TemaProvider>
);
