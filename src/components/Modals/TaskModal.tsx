import { Form, Input, Modal, Select } from "antd";

import ModalTitle from "./ModalTitle";
import type { TaskFormValues } from "@/types";
import { useEffect } from "react";

interface AddTaskModalProps {
  open: boolean;
  title: string;
  taskId?: number;
  initialValues?: TaskFormValues;
  onSave: (values: TaskFormValues, taskId?: number) => void;
  onCancel: () => void;
}

const TaskModal: React.FC<AddTaskModalProps> = ({
  open,
  title,
  taskId,
  initialValues,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      open={open}
      title={<ModalTitle title={title} />}
      destroyOnHidden
      okText="שמירה"
      cancelText="ביטול"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave(values, taskId);
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

        <Form.Item
          name="status"
          label="סטטוס"
          rules={[
            {
              required: true,
              message: "הזן את סטטוס המשימה!",
            },
          ]}
        >
          <Select placeholder="בחר סטטוס" allowClear>
            <Select.Option value="not_completed">לא הושלמה</Select.Option>
            <Select.Option value="in_progress">בביצוע</Select.Option>
            <Select.Option value="completed">הושלמה</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
