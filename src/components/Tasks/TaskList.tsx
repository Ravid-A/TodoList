import { List } from "antd";

import { useTasks } from "../../hooks/useTasks";

import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, toggleTask } = useTasks();

  return (
    <List
      footer={<div>Footer</div>}
      bordered
      dataSource={tasks}
      renderItem={(item) => <TaskItem task={item} toggleTask={toggleTask} />}
    />
  );
};

export default TaskList;
