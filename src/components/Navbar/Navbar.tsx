import { Layout, Menu } from "antd";
import Logo from "./Logo";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      {/* <Logo /> */}
      <Menu
        theme="dark"
        mode="horizontal"
        items={[]}
        defaultSelectedKeys={["2"]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default Navbar;
