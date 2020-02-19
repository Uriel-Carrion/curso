import React, { useState } from "react";
import { Form, Icon, Input } from "antd";
import Recaptcha from "react-recaptcha";
import "./Login.scss";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constanst";
import { basePath, apiVersion } from "../../api/config";
export default function Login(props) {
  //Key para poder generar el recapcha, está key puede cambiar dependiendo el proyecto ya que se obtiene a través de una cuenta gmail
  const CAP_KEY = "6LcsaLkUAAAAAB8BbO3XMflwqviSFH6jQeS6KbY4";
  
  //Hooks
  const [capcha, setCapcha] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const verifyCallback = response => {
    setCapcha({ capcha }); //función que comprueba que el recapcha se selecciono correctamente
  };
  const recaptchaLoaded = () => {
    console.log("captcha successfully loaded"); //Realiza un callback al capcha
  };
  //Funcíon que obtiene los cambios que a tenido el formulario
  const changeForm = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    if (!capcha) {
      //Se verifica el capcha
      alert("Selecciona el capcha");
    } else {
      //Se realiza la petición al server
      const url = `${basePath}/${apiVersion}/sign-in`;
      axios.post(url, inputs).then(response => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          const { accessToken, refreshToken } = response.data; //Se obtiene el token de json
          localStorage.setItem(ACCESS_TOKEN, accessToken); //Se almacena en localStorage
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
          window.location.href = "/home"; //Se redirecciona al home
        }
      });
    }
  };

  return (
    <div className="div_login">
      <div className="login-image">

      </div>
      <Form className="login-form" onChange={changeForm} onSubmit={login}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "#d5007f" }} />}
            placeholder="Usuario"
            name="email"
            style={{ width: "100%" }}
            required={true}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "#d5007f" }} />}
            type="password"
            name="password"
            placeholder="Contraseña"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <div className="login-form__capcha" id="rc-imageselect">
          <Recaptcha
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
            sitekey={CAP_KEY}
            hl={"es"}
            render="explicit"
          />
        </div>
        <Form.Item>
          <button type="submit" className="login-form__button">
            Iniciar Sesión
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
