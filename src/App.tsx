import { useState } from "react";
import { useTasks } from "./hooks/useTasks";

import "./App.css";

import { Layout } from "antd";

import Navbar from "./components/Navbar";
import Title from "antd/es/typography/Title";
import { TaskList, TaskSearchbar } from "./components/Tasks";
import { Content } from "antd/es/layout/layout";

function App() {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  // const { addTask } = useTasks();

  // const onAddTask = () => {
  //   if (newTaskTitle.trim()) {
  //     addTask(newTaskTitle);
  //     setNewTaskTitle("");
  //   }
  // };

  return (
    <Layout>
      <Navbar />

      <Content>
        <Title className="rubik-300 ">המשימות שלי להיום</Title>

        <TaskSearchbar />

        <TaskList />
      </Content>
    </Layout>
  );
}

export default App;
