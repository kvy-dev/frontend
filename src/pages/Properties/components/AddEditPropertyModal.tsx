import { useState } from "react";
import { Form, Modal, Input, InputNumber, DatePicker, Select, Button, Divider, message, Upload } from "antd";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import styles from "../styles.module.scss";
import { axiosInstance } from "@/services/API";

const { Option } = Select;

interface Props {
  edit?: boolean;
  data?: any;
  refetch: () => void;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

const AddEditPropertyModal = ({ edit, data, refetch }: Props) => {
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFormChange = (changedValues: any) => {
    form.setFieldsValue(changedValues);
  };

  const beforeUpload = (file: File) => {
    const isAllowedFormat = ALLOWED_FORMATS.includes(file.type);
    const isWithinSizeLimit = file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB;

    if (!isAllowedFormat) {
      message.error("Only JPG, JPEG, and PNG files are allowed!");
      return Upload.LIST_IGNORE;
    }

    if (!isWithinSizeLimit) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }

    setSelectedFile(file);
    message.success("Image selected successfully!");
    return false; // Prevent automatic upload
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("status", values.status || "OPEN");
      formData.append("areaSqYards", values.areaSqYards);
      formData.append("facing", values.facing || "");
      formData.append("location", values.location || "");
      formData.append("possessionDate", values.possessionDate || "");
      formData.append("description", values.description || "");
  
      // Convert units array to a JSON string and append it
      formData.append("units", JSON.stringify(values.units || []));
  
      if (selectedFile) {
        formData.append("propertyImage", selectedFile);
      }
  
      const endpoint = edit ? `/kyv/api/property/${data.propertyId}` : `/kyv/api/property/addProperty`;
      const method = edit ? "put" : "post";
  
      await axiosInstance[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      refetch();
  
      message.success(`Property ${edit ? "updated" : "created"} successfully!`);
      setShowPropertyModal(false);
    } catch (error) {
      message.error(`Error ${edit ? "updating" : "creating"} property`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields(undefined);
    setShowPropertyModal(false);
  }

  return (
    <>
      <div className={styles.addPropertyCTA} onClick={() => setShowPropertyModal(true)}>
        {edit ? <EditFilled className={styles.edit} /> : "Add Property"}
      </div>
      <Modal
        open={showPropertyModal}
        onCancel={handleClose}
        footer={null}
        width="100vw"
        bodyStyle={{ height: "calc(100dvh - 170px)", overflowY: "auto" }}
      >
        <h2>{edit ? "Edit Property" : "Add Property"}</h2>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          initialValues={data || {}}
          onValuesChange={handleFormChange}
          onFinish={handleFinish}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
        >
          <Form.Item label="Property Image">
            <Upload showUploadList={true} beforeUpload={beforeUpload}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Property Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select defaultValue="OPEN">
              <Option value="OPEN">Open</Option>
              <Option value="RESTRICTED">Restricted</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Area (Sq. Yards)" name="areaSqYards">
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item label="Facing" name="facing">
            <Input />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>

          <Form.Item label="Possession Date" name="possessionDate">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.List name="units">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10, gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                    <Form.Item {...restField} label="Floor" name={[name, "floor"]}>
                      <Input />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)} style={{ gridColumn: '1 / -1' }}>Remove Unit</Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} style={{ gridColumn: '1 / -1' }}>Add Unit</Button>
              </>
            )}
          </Form.List>
          
          <Form.Item style={{ gridColumn: '1 / -1' }}>
            <Button type="primary" loading={loading} htmlType="submit">
              {edit ? "Update Property" : "Add Property"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditPropertyModal;
