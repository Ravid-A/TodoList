import { FloatButton, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import "./App.css";

import Navbar from "./components/Navbar";
import { TaskList, TaskSearchbar } from "./components/Tasks";
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Navbar />

      <Content className="app-container">
        <Title className="rubik-300 app-title">המשימות שלי להיום</Title>

        <TaskSearchbar />

        <TaskList />

        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ insetInlineEnd: 24 }}
        />
      </Content>
    </Layout>
  );
}

export default App;
