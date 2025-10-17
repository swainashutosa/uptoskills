import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AdminApp from "./AdminApp.jsx";
import "./index.css";
import ContestProvider from "./ContestContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin">
      <ContestProvider>
        <AdminApp />
      </ContestProvider>
    </BrowserRouter>
  </React.StrictMode>
);
