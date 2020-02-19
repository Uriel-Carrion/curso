import React from "react";
import { Layout, Button } from "antd"; //Se importan los componentes de ant desig
import "./Header.scss";
import LogoUser from "../../assets/img/user.svg";
//cerrar sesión
import { logout } from "../../api/auth";

export default function Header(props) {
  const { user} = props; //Se recibe el logo por props
  const { Header } = Layout; //Se importa el header del componente del Layout
  console.log(user);
  
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  
  return (
    <Header>
      <div className="menu-top">
        {/*Se crea la estructura del header  */}
        <div className="menu-top__logo">
          
        </div>
        <div className="menu-top__ayuda">
          <p>            
            {user && (
              <>
                <img src={LogoUser} className="user" alt="user" />
                {user.email} |
                <Button type="link" onClick={logoutUser}>
                  Cerrar sesión
                </Button>
              </>
            )}
          </p>
        </div>
      </div>
    </Header>
  );
}
