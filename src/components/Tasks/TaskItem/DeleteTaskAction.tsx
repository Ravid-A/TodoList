import { useTasksUtils } from "@/store/TasksReducer";
import { Tooltip } from "antd";
import { Trash2 } from "lucide-react";

interface DeleteTaskActionProps {
  taskId: number;
}

const DeleteTaskAction: React.FC<DeleteTaskActionProps> = ({ taskId }) => {
  const { deleteTask } = useTasksUtils();

  return (
    <Tooltip title="מחק משימה">
      <a onClick={() => deleteTask(taskId)}>
        <Trash2 />
      </a>
    </Tooltip>
  );
};

export default DeleteTaskAction;
