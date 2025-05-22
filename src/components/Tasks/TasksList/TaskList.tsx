import { List } from "antd";

import { useTasks, useTasksUtils } from "@/store/TasksContext";

import { TaskItem } from "../TaskItem";
import TaskListFooter from "./TaskListFooter";
import { TaskModal } from "@/components/Modals";
import { useState } from "react";
import { statusMap, TaskStatus, type Task, type TaskFormValues } from "@/types";

const TaskList: React.FC = () => {
  const tasks = useTasks();
  const { updateTask } = useTasksUtils();

  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [values, setValues] = useState<TaskFormValues>();
  const [taskId, setTaskId] = useState<number>(-1);

  const handleEditTask = (task: Task) => {
    setTaskId(task.id);
    setValues({
      title: task.title,
      status:
        task.status == TaskStatus.STATUS_NOT_COMPLETED
          ? "not_completed"
          : task.status == TaskStatus.STATUS_IN_PROGRESS
          ? "in_progress"
          : "completed",
    });
    setIsEditTask(true);
  };

  const handleSave = (values: TaskFormValues, taskId?: number) => {
    updateTask(taskId!, values.title, statusMap[values.status]);
    setIsEditTask(false);
  };

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
        renderItem={(item) => (
          <TaskItem task={item} handleEditTask={handleEditTask} />
        )}
      />

      <TaskModal
        open={isEditTask}
        title="עריכת משימה"
        initialValues={values}
        taskId={taskId}
        onSave={handleSave}
        onCancel={() => {
          setIsEditTask(false);
        }}
      />
    </div>
  );
};

export default TaskList;
