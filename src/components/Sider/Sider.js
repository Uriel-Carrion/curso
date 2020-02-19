import React from "react";
import { Layout, Menu, Icon } from "antd";
import "./Sider.scss";

export default function Home() {
  const { SubMenu } = Menu;
  const { Sider } = Layout; 
  return (
    <Sider collapsible style={{ background: "#fff" }} width={230}>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ marginTop: "50px" }}
      >
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>User</span>
            </span>
          }
        >
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>

        <Menu.Item key="9">
          <Icon type="file" />
          <span>Files</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
