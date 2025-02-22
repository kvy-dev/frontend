import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { axiosInstance } from "@/services/API";

const EditPofileModal = ({ visible, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values); // Call parent submit function
    localStorage.setItem('kvy_user_name', values.name)
    form.resetFields(undefined);
  };

  const handleCancel = () => {
    form.resetFields(undefined);
    onCancel();
  }

  return (
    <Modal
      title="Builder Information"
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter a phone number" },
            { pattern: /^\d{10}$/, message: "Enter a valid 10-digit number" }
          ]}
        >
          <Input placeholder="Enter phone number" disabled maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Instagram Profile"
          name="instagramProfile"
          rules={[{ type: "url", message: "Enter a valid URL" }]}
        >
          <Input placeholder="Enter Instagram URL" />
        </Form.Item>

        <Form.Item
          label="Website URL"
          name="websiteUrl"
          rules={[{ type: "url", message: "Enter a valid URL" }]}
        >
          <Input placeholder="Enter Website URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>Update Profile</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditProfile = ({ initialValues, onSuccess }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);
  const handleSubmit = (data: any) => {
    axiosInstance.put('/kyv/api/user/profile/edit', data)
    .then(() => {
      onSuccess();
    })
    .catch(() => {})
    .finally(() => {
      handleClose();
    });
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen}>Edit Profile</Button>
      <EditPofileModal visible={isModalVisible} onCancel={handleClose} onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
};

export default EditProfile;
