import { Checkbox, List } from "antd";

import { TaskStatus, type Task } from "@/types";
import { useTasksUtils } from "@/store/TasksContext";
import TaskAction from "./TaskAction";
import { Pencil, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  handleEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleEditTask }) => {
  const { deleteTask } = useTasksUtils();

  const handleEditActionClick = () => {
    handleEditTask(task);
  };

  const handleDeleteActionClick = () => {
    deleteTask(task.id);
  };

  return (
    <List.Item
      actions={[
        <TaskAction title="ערוך משימה" handleClick={handleEditActionClick}>
          <Pencil />
        </TaskAction>,
        <TaskAction title="מחק משימה" handleClick={handleDeleteActionClick}>
          <Trash2 />
        </TaskAction>,
      ]}
    >
      <div>
        <Checkbox
          checked={task.status === TaskStatus.STATUS_COMPLETED}
          indeterminate={task.status === TaskStatus.STATUS_IN_PROGRESS}
          disabled
        />
        <bdi className="task-title">{task.title}</bdi>
      </div>
    </List.Item>
  );
};

export default TaskItem;
