import { List } from "antd";

import { useTasks, useTasksUtils } from "@/store/TasksReducer";

import { TaskItem } from "../TaskItem";
import TaskListFooter from "./TaskListFooter";
import { TaskModal } from "@/components/Modals";
import { useState } from "react";
import { statusMap, TaskStatus, type Task, type TaskFormValues } from "@/types";

import { useFilterMethod } from "@/store/FilterMethodContext";
import { useSortMethod } from "@/store/SortMethodContext";
import { useSearchParameter } from "@/store/SearchParameterContext";

const TaskList: React.FC = () => {
  const filterMethod = useFilterMethod();
  const sortMethod = useSortMethod();
  const searchParameter = useSearchParameter();

  const tasks = useTasks();
  const { updateTask } = useTasksUtils();

  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [values, setValues] = useState<TaskFormValues>();
  const [taskId, setTaskId] = useState<number>(-1);

  const getDataSource = () => {
    let dataSource = tasks;

    if (filterMethod != "all") {
      dataSource = dataSource.filter(
        (task) =>
          task.status ==
          (filterMethod == "completed"
            ? TaskStatus.STATUS_COMPLETED
            : filterMethod == "in_progress"
            ? TaskStatus.STATUS_IN_PROGRESS
            : TaskStatus.STATUS_NOT_COMPLETED)
      );
    }

    dataSource = dataSource.sort((a, b) => {
      const sortOrder = sortMethod === "ASC" ? 1 : -1;
      return (a.timestamp - b.timestamp) * sortOrder;
    });

    return dataSource.filter((task) => task.title.includes(searchParameter));
  };

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

  const getTotalToCompleted = (): number => {
    return tasks.filter((task) => task.status !== TaskStatus.STATUS_COMPLETED)
      .length;
  };

  return (
    <div className="tasks-list">
      <List
        size="large"
        pagination={{
          align: "center",
          pageSize: 5,
        }}
        footer={<TaskListFooter totalToComplete={getTotalToCompleted()} />}
        bordered
        dataSource={getDataSource()}
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
