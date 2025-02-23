import { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "@/services/API";

const MAX_FILE_SIZE_MB = 10; // Maximum file size in MB
const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png"]; // Allowed image types

const EditProfileModal = ({ visible, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store selected profile image
  const [selectedVisitingCard, setSelectedVisitingCard] = useState<File | null>(null); // Store visiting card image

  const handleFinish = (values: any) => {
    const formData = new FormData();
    
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("instagramProfile", values.instagramProfile || "");
    formData.append("websiteUrl", values.websiteUrl || "");

    if (selectedFile) {
      formData.append("profileImage", selectedFile); // Append profile image if selected
    }
    
    if (selectedVisitingCard) {
      formData.append("visitingCard", selectedVisitingCard); // Append visiting card image if selected
    }

    onSubmit(formData); // Submit formData
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const beforeUpload = (file: File, setFile: Function) => {
    const isAllowedFormat = ALLOWED_FORMATS.includes(file.type);
    const isWithinSizeLimit = file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB;

    if (!isAllowedFormat) {
      message.error("Only JPG, JPEG, and PNG files are allowed!");
      return Upload.LIST_IGNORE; // Prevent upload
    }

    if (!isWithinSizeLimit) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE; // Prevent upload
    }

    setFile(file); // Store file for later submission
    message.success("Image selected successfully!");
    return false; // Prevent automatic upload
  };

  return (
    <Modal title="Profile Information" open={visible} onCancel={handleCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
        <Form.Item label="Profile Image">
          <Upload showUploadList={true} beforeUpload={(file) => beforeUpload(file, setSelectedFile)}>
            <Button icon={<UploadOutlined />}>Select Profile Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name" }]}> 
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

        <Form.Item label="Instagram Profile" name="instagramProfile" rules={[{ type: "url", message: "Enter a valid URL" }]}> 
          <Input placeholder="Enter Instagram URL" />
        </Form.Item>

        <Form.Item label="Website URL" name="websiteUrl" rules={[{ type: "url", message: "Enter a valid URL" }]}> 
          <Input placeholder="Enter Website URL" />
        </Form.Item>

        <Form.Item label="Visiting Card Image">
          <Upload showUploadList={true} beforeUpload={(file) => beforeUpload(file, setSelectedVisitingCard)}>
            <Button icon={<UploadOutlined />}>Select Visiting Card</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditProfile = ({ initialValues, onSuccess }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      await axiosInstance.put("/kyv/api/user/profile/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Profile updated successfully!");
      onSuccess();
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Edit Profile
      </Button>
      <EditProfileModal visible={isModalVisible} onCancel={handleClose} onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
};

export default EditProfile;
