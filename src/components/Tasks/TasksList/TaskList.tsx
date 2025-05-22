import { List } from "antd";

import { useTasks } from "@/store/TasksReducer";

import { TaskItem } from "../TaskItem";
import TaskListFooter from "./TaskListFooter";

const TaskList: React.FC = () => {
  const tasks = useTasks();

  return (
    <div className="tasks-list">
      <List
        style={{
          maxHeight: 435,
          width: 500,
        }}
        pagination={{
          align: "center",
          pageSize: 5,
        }}
        footer={<TaskListFooter />}
        bordered
        dataSource={tasks}
        renderItem={(item) => <TaskItem task={item} />}
      />
    </div>
  );
};

export default TaskList;
