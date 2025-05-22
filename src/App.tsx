import { FloatButton, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import "./App.css";

import Navbar from "./components/Navbar";
import { TaskList, TaskSearchbar } from "./components/Tasks";
import { AddTaskModal } from "./components/Modals/AddTask";
import { useState } from "react";
const { Content } = Layout;

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);

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
          onClick={() => {
            setIsAddTaskOpen(true);
          }}
          style={{ insetInlineEnd: 24 }}
        />
      </Content>

      <AddTaskModal open={isAddTaskOpen} setOpen={setIsAddTaskOpen} />
    </Layout>
  );
}

export default App;
