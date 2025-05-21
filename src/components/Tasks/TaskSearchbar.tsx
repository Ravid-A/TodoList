import Search from "antd/es/input/Search";

const TaskSearchbar = () => {
  const onSearch = (val: string) => {
    console.log(val);
  };

  return (
    <div className="searchbar-container">
      <Search
        placeholder="חיפוש..."
        allowClear
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default TaskSearchbar;
