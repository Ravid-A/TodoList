import { Tooltip } from "antd";
import type { ReactNode } from "react";

interface TaskActionProps {
  title: string;
  children: ReactNode;
  className: string;
  handleClick: () => void;
}

const TaskAction: React.FC<TaskActionProps> = ({
  title,
  children,
  className,
  handleClick,
}) => {
  return (
    <Tooltip title={title}>
      <a className={className} onClick={handleClick}>
        {children}
      </a>
    </Tooltip>
  );
};

export default TaskAction;
