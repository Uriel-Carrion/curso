import React from 'react'
import { Layout } from "antd";
//Componentes 
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sider from "../components/Sider/Sider";

import { Route, Switch, Redirect } from 'react-router-dom';
//Se importa el context para obtener la información del usuario 
import useAuth from "../hooks/useAuth";
//pages
import AdminLogin from '../pages/Admin/Login/Login';

export default function LayoutAdmin(props) {
    const { routes } = props;//Se obtienes las rutas por props
    const { Content } = Layout; //Se obtiene el componente hijo de Layout
    const { user, isLoading } = useAuth();
    console.log(useAuth());
    //Verifica si el usuario existe si no lo redirecciona al login
    if (!user && !isLoading) {
        return (
            <>
                <Route path="/" component={AdminLogin} />
                <Redirect to="/" />
            </>
        );
    }
//Si existe renderiza el Layout principal
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/**Se importa el header y se le envía el logo correspondiente */}
            <Header user={user}/>
            <Layout>
                <Sider />
                <Layout className="layout">
               
                    <Content className="content">
                        {/**Contenido, se vuelven a iterar las rutas para poder navegar entre ellas */}
                        <LoadRoutes routes={routes} />
                    </Content>
                </Layout>
            </Layout>
            {/**Footer con la versión del sistema */}
            <Footer version="Versión 11.0" anio="2020" />
        </Layout>
    )

}
//Función que itera las rutas individualmente 
function LoadRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}