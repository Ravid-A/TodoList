import { useState } from "react";
import type { Task, TaskFunction, UpdateTaskFunction } from "../../types";
import { List, Typography } from "antd";

interface TaskItemProps {
  task: Task;
  toggleTask: TaskFunction;
  // deleteTask: TaskFunction;
  // updateTaskTitle: UpdateTaskFunction;
}

const TaskItem = ({ task, toggleTask }: TaskItemProps) => {
  // const [editing, setEditing] = useState<boolean>(false);
  // const [newTitle, setNewTitle] = useState<string>(task.title);

  // const handleToggle = () => {
  //   toggleTask(task.id);
  // };

  // const handleDelete = () => {
  //   deleteTask(task.id);
  // };

  // const handleDoubleClick = () => {
  //   if (!task.completed) {
  //     setEditing(!editing);
  //   }
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTitle(event.target.value);
  // };

  // const handleSaveTitle = () => {
  //   updateTaskTitle(task.id, newTitle);
  //   setEditing(false);
  // };

  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit">edit</a>,
        <a key="list-loadmore-more">more</a>,
      ]}
    >
      <Typography.Text mark>[ITEM]</Typography.Text> {task.title}
    </List.Item>
  );
};

export default TaskItem;
