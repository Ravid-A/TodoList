import { Tooltip } from "antd";
import { Pencil } from "lucide-react";

interface EditTaskActionProps {
  taskId: number;
}

const EditTaskAction: React.FC<EditTaskActionProps> = ({ taskId }) => {
  const handleClick = () => {
    console.log(`edit task: ${taskId}`);
  };

  return (
    <Tooltip title="ערוך משימה">
      <a onClick={handleClick}>
        <Pencil />
      </a>
    </Tooltip>
  );
};

export default EditTaskAction;
