import { Tooltip } from "antd";
import type { ReactNode } from "react";

interface TaskActionProps {
  title: string;
  children: ReactNode;
  handleClick: () => void;
}

const TaskAction: React.FC<TaskActionProps> = ({
  title,
  children,
  handleClick,
}) => {
  return (
    <Tooltip title={title}>
      <a onClick={handleClick}>{children}</a>
    </Tooltip>
  );
};

export default TaskAction;
