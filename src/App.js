import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from "./config/routes";//Se importan todas las rutas del sistema
import AuthProvider from './api/AuthProvider';//Se importa la configuración del provider

 
function App() {
  return (
    //Se pone el AuthProvider como componente raiz para pasar la información a todos los hijos
    <AuthProvider>
      <Router>
        <Switch>           
          {routes.map((route, i) => (
            <RoutesWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider> 
  )
}
//Función que itera las rutas
function RoutesWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}
export default App;
