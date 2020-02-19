import React from "react";
//Se importan los componentes a utilizar
//import Login from "../../components/Login/Login";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sider from "../../components/Sider/Sider";
import Proceso from "../../components/Proceso_Menu/Proceso_Menu";
//Logos
import { ReactComponent as Logo_Header } from "../../assets/img/ID_docs.svg";
//import { ReactComponent as Logo_Login } from "../../assets/img/ID_Docs2.svg";
//Componentes de ant desig
import { Layout } from "antd";
import "./Home.scss";
//import {getAccessTokenApi} from '../../api/auth';

//import { Route } from 'react-router-dom';

//import useAuth from '../../hooks/useAuth';

export default function Home(props) {
  const { Content } = Layout; //Se obtiene el componente hijo de Layout
  //const { user, isLoading } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/**Se importa el header y se le envía el logo correspondiente */}
      <Header
        Logo={Logo_Header}
        Tipo={2}
      />
      <Layout>
        <Sider />
        <Layout className="layout">
          <Proceso
            tipo_eleccion_gen="PEL-ORD-Aguascalientes"
            tipo_eleccion_esp="BAJA CALIFORNIA SUR - 01 SAN CRISTOBAL DE LAS CASAS"
          />
          <Content className="content">
            {/**Contenido  */}

          </Content>
        </Layout>
      </Layout>
      {/**Footer con la versión del sistema */}
      <Footer version="Versión 11.0" anio="2020" />
    </Layout>
  );
}
