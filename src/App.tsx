import { FloatButton, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import "./App.css";

import Navbar from "./components/Navbar";
import { TaskList, TaskSearchbar } from "./components/Tasks";
import { useState } from "react";
import { TaskModal } from "./components/Modals";
import { statusMap, type TaskFormValues } from "./types";
import { useTasksUtils } from "./store/TasksReducer";
const { Content } = Layout;

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const { addTask } = useTasksUtils();

  const onSave = (values: TaskFormValues) => {
    addTask(values.title, statusMap[values.status]);
    setIsAddTaskOpen(false);
  };

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

      <TaskModal
        open={isAddTaskOpen}
        title="משימה חדשה"
        onSave={onSave}
        onCancel={() => {
          setIsAddTaskOpen(false);
        }}
      />
    </Layout>
  );
}

export default App;
