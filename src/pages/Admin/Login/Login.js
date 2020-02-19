import React from "react";
import { Redirect } from "react-router-dom";
//Se importan los componentes a utilizar
import Login from "../../../components/Login/Login";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

//Componentes de ant desig
import { Layout } from "antd";
import "./Login.scss";
import { getAccessTokenApi } from "../../../api/auth";

export default function LoginPrincipal() {
  const { Content } = Layout; //Se obtiene el componente hijo de Layout
  if (getAccessTokenApi()) {
    return <Redirect to="/" />;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/**Se importa el header y se le envía el logo correspondiente */}
      <Header />
      <Layout>
        <Layout className="layout">
          <Content className="content">
            {/**Contenido  */}
            <Login />
          </Content>
        </Layout>
      </Layout>
      {/**Footer con la versión del sistema */}
      <Footer version="Versión 1.0" anio="2020" />
    </Layout>
  );
}
