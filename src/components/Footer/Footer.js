import React from "react";
import { Layout } from "antd";
import "./Footer.scss";

export default function Footer(props) {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <div className="footer__version">
          {props.version} / {new Date().getFullYear()}
      </div>
    </Footer>
  );
}
