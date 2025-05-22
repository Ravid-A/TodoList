import { Checkbox, List } from "antd";
import type { CheckboxProps } from "antd";

import { TaskStatus, type Task } from "@/types";
import { useTasksUtils } from "@/store/TasksReducer";
import DeleteTaskAction from "./DeleteTaskAction";
import EditTaskAction from "./EditTaskAction";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask } = useTasksUtils();

  const onChange: CheckboxProps["onChange"] = () => {
    toggleTask(task.id);
  };

  return (
    <List.Item
      actions={[
        <EditTaskAction taskId={task.id} />,
        <DeleteTaskAction taskId={task.id} />,
      ]}
    >
      <div>
        <Checkbox
          checked={task.status === TaskStatus.STATUS_COMPLETED}
          indeterminate={task.status === TaskStatus.STATUS_IN_PROGRESS}
          onChange={onChange}
          disabled
        />
        <bdi className="task-title">{task.title}</bdi>
      </div>
    </List.Item>
  );
};

export default TaskItem;
