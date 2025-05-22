import { FloatButton, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import "./App.css";

import Navbar from "./components/Navbar";
import { TaskList, TaskSearchbar } from "./components/Tasks";
import { useState } from "react";
import { TaskModal } from "./components/Modals";
import { statusMap, type TaskFormValues } from "./types";
import { useTasksUtils } from "./store/TasksContext";
const { Content } = Layout;

function App() {
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const { addTask } = useTasksUtils();

  const onSave = (values: TaskFormValues) => {
    addTask(values.title, statusMap[values.status]);
    setIsAddTask(false);
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
            setIsAddTask(true);
          }}
          style={{ insetInlineEnd: 24 }}
        />
      </Content>

      <TaskModal
        open={isAddTask}
        title="משימה חדשה"
        onSave={onSave}
        onCancel={() => {
          setIsAddTask(false);
        }}
      />
    </Layout>
  );
}

export default App;
