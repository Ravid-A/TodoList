import { Checkbox, List } from "antd";
import type { CheckboxProps } from "antd";

import { Trash2, Pencil } from "lucide-react";

import type { Task } from "@/types";
import { useTasksUtils } from "@/store/TasksReducer";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask } = useTasksUtils();

  const onChange: CheckboxProps["onChange"] = () => {
    toggleTask(task.id);
  };

  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">
          <Pencil />
        </a>,
        <a key="list-loadmore-more">
          <Trash2 />
        </a>,
      ]}
    >
      <div>
        <Checkbox onChange={onChange} style={{}} />
        <bdi className="task-title">{task.title}</bdi>
      </div>
    </List.Item>
  );
};

export default TaskItem;
