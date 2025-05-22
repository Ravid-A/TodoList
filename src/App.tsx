import { FloatButton, Layout } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
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
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const { deleteAllTasks, addTask } = useTasksUtils();

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
          tooltip="להוסיף משימה"
          style={{ insetInlineEnd: 100 }}
        />
        <FloatButton
          icon={<DeleteOutlined />}
          type="primary"
          tooltip="למחוק את כל המשימות"
          onClick={() => {
            deleteAllTasks();
          }}
          style={{ insetInlineStart: 100 }}
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
