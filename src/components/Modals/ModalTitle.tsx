import Title from "antd/es/typography/Title";

interface ModalTitleProps {
  title: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ title }) => {
  return <Title className="modal-title">{title}</Title>;
};

export default ModalTitle;
