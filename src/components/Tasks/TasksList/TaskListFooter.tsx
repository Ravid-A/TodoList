import {
  useFilterMethod,
  useSetFilterMethod,
} from "@/store/FilterMethodContext";
import { Radio } from "antd";
import Title from "antd/es/typography/Title";

interface TaskListFooterProps {
  totalToComplete: number;
}

const TaskListFooter: React.FC<TaskListFooterProps> = ({ totalToComplete }) => {
  const filterMethod = useFilterMethod();
  const setFilterMethod = useSetFilterMethod();

  const totalString = `נשארו ${totalToComplete} משימ${
    totalToComplete != 1 ? "ות" : "ה"
  }`;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Radio.Group
          value={filterMethod}
          onChange={(e) => {
            setFilterMethod(e.target.value);
          }}
        >
          <Radio.Button value="all">הכל</Radio.Button>
          <Radio.Button value="completed">משימות שהושלמו</Radio.Button>
          <Radio.Button value="in_progress">משימות בביצוע</Radio.Button>
          <Radio.Button value="not_completed">משימות חדשות</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <Title className="tasks-left rubic-600">{totalString}</Title>
      </div>
    </>
  );
};

export default TaskListFooter;
