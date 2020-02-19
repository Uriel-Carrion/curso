import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout
} from "../api/auth";
//Se crea un contexto global que obtendra la información del usuario y se la pasará a todos los componentes hijos
//Sin necesidad de poner manualmente la información del usuario en cada componente 
export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;//Todos loc componentes que esten dentro de AutjProvider
  const [user, setUser] = useState({//Hook para almacenar la información del usuario
    user: null,
    isLoading: true
  });

  useEffect(() => {
    checkUserLogin(setUser);//Verificar la información
  }, []);
//Se le manda la información del usuario a todos los componentes hijos
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();//Se obtiene el token que esta almacenado en localStorage
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();//Comprueba si existe el segundo token

    if (!refreshToken) {//Si no existe cierra la sesión 
      logout();
      setUser({
        user: null,
        isLoading: false
      });
    } else {//Refresca el token
      refreshAccessTokenApi(refreshToken);
    }
  } else {//Si existe el token lo almacena en el hook
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken)
    });
  }
}
