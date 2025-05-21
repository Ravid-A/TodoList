import { Input, Radio } from "antd";

const TaskSearchbar = () => {
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
      />

      <div style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          מיון לפי:
        </span>
        <Radio.Group defaultValue="asc">
          <Radio.Button value="asc">↑</Radio.Button>
          <Radio.Button value="desc">↓</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default TaskSearchbar;
