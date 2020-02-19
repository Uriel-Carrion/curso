import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constanst";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);//Se verifica que el token exista en el localstorage

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}
//Función que verifa el token de refresToken para tambien actualizarlo(Ejemplo)
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

//Función que vuelve a solicitar el token 
export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(url, params)
    .then(response => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(result => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}
//Elimina el token del navegador
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}
//Verifica que no haya expirado el token 
function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);//decodifica el token 
  const { exp } = metaToken;//Se obtiene el tiempo de vida del token
  const now = (Date.now() + seconds) / 1000;
  return now > exp;//verifica que no hay expirado
}
