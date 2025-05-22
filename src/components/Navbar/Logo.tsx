import Title from "antd/es/typography/Title";
import { ListChecks } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <div className="demo-logo">
      <ListChecks />

      <Title>הרשימה המבצעית</Title>
    </div>
  );
};

export default Logo;
