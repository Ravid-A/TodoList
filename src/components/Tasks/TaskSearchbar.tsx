import {
  useSearchParameter,
  useSetSearchParameter,
} from "@/store/SearchParameterContext";
import { useSetSortMethod, useSortMethod } from "@/store/SortMethodContext";
import { Input, Radio } from "antd";

const TaskSearchbar: React.FC = () => {
  const sortMethod = useSortMethod();
  const setSortMethod = useSetSortMethod();

  const searchParameter = useSearchParameter();
  const setSearchParameter = useSetSearchParameter();

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Input
        placeholder="חיפוש..."
        allowClear
        style={{
          width: "300px",
          maxWidth: "100%",
        }}
        value={searchParameter}
        onChange={(e) => {
          setSearchParameter(e.target.value);
        }}
      />

      <div style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          מיון לפי:
        </span>
        <Radio.Group
          value={sortMethod}
          onChange={(e) => {
            setSortMethod(e.target.value);
          }}
        >
          <Radio.Button value="ASC">↑</Radio.Button>
          <Radio.Button value="DESC">↓</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default TaskSearchbar;
