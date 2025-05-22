import { useTasksUtils } from "@/store/TasksReducer";
import { Form, Input, Modal } from "antd";

import Title from "antd/es/typography/Title";

interface TaskFormValues {
  title: string;
}

interface AddTaskModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTitle = <Title className="modal-title">משימה חדשה</Title>;

const AddTaskModal = ({ open, setOpen }: AddTaskModalProps) => {
  const { addTask } = useTasksUtils();

  const [form] = Form.useForm();

  const onCreate = (values: TaskFormValues) => {
    addTask(values.title);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={ModalTitle}
      okText="שמירה"
      cancelText="ביטול"
      onCancel={() => {
        setOpen(false);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="add-task-form"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="הכנס שם משימה:"
          rules={[
            {
              required: true,
              message: "הכנס את שם המשימה!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
