import { useState } from "react";
import { Form, Modal, Input, InputNumber, Select, Button, Divider, message, Upload } from "antd";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import styles from "../styles.module.scss";
import { axiosInstance } from "@/services/API";
import dayjs from "dayjs";

const { Option } = Select;

interface Props {
  edit?: boolean;
  data?: any;
  refetch: () => void;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_IMAGE_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const ALLOWED_PDF_FORMATS = ["application/pdf"];

const AddEditPropertyModal = ({ edit, data, refetch }: Props) => {
  console.log(data);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const handleFormChange = (changedValues: any) => {
    form.setFieldsValue(changedValues);
  };

  const beforeUpload = (file: File, type: "image" | "pdf") => {
    const isAllowedFormat = type === "image" ? ALLOWED_IMAGE_FORMATS.includes(file.type) : ALLOWED_PDF_FORMATS.includes(file.type);
    const isWithinSizeLimit = file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB;

    if (!isAllowedFormat) {
      message.error(type === "image" ? "Only JPG, JPEG, and PNG files are allowed!" : "Only PDF files are allowed!");
      return Upload.LIST_IGNORE;
    }

    if (!isWithinSizeLimit) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }

    if (type === "image") {
      setSelectedFile(file);
      message.success("Image selected successfully!");
    } else {
      setBrochureFile(file);
      message.success("Brochure PDF selected successfully!");
    }

    return false; // Prevent automatic upload
  };

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      const unitsMap = (values.units || []).map((unit: number) => ({ floor: unit }));
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("status", values.status || "OPEN");
      formData.append("areaSqYards", values.areaSqYards || "");
      formData.append("facing", values.facing || "");
      formData.append("location", values.location || "");
      formData.append("possessionDate", values.possessionDate ? values.possessionDate.toISOString() : "");
      formData.append("description", values.description || "");
      formData.append("units", JSON.stringify(unitsMap || []));

      if (selectedFile) {
        formData.append("propertyImage", selectedFile);
      }

      if (brochureFile) {
        formData.append("brochurePdf", brochureFile);
      }

      const endpoint = edit ? `/kyv/api/property/${data.propertyId}` : `/kyv/api/property/addProperty`;
      const method = edit ? "put" : "post";

      await axiosInstance[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleClose();
      refetch();
      message.success(`Property ${edit ? "updated" : "created"} successfully!`);
    } catch (error) {
      console.log(error);
      message.error(`Error ${edit ? "updating" : "creating"} property`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields(undefined);
    setShowPropertyModal(false);
  };

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
          initialValues={{
            ...data,
            possessionDate: data?.possessionDate ? dayjs(data.possessionDate) : null,
          }}
          onValuesChange={handleFormChange}
          onFinish={handleFinish}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
        >
          <Form.Item label="Property Image">
            <Upload showUploadList={true} beforeUpload={(file) => beforeUpload(file, "image")}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Brochure PDF">
            <Upload showUploadList={true} beforeUpload={(file) => beforeUpload(file, "pdf")}>
              <Button icon={<UploadOutlined />}>Select Brochure</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Property Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Address (For eg. 2-266 Panscheel Enclave)" name="address" rules={[{ required: true }]}>
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

          <Form.Item label="Google Location (url)" name="location">
            <Input />
          </Form.Item>

          <Form.Item label="Possession Date" name="possessionDate">
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Select Floors" name="units">
            <Select mode="multiple" placeholder="Select floors">
              {[...Array(10).keys()].map((i) => (
                <Option key={i + 1} value={i + 1}>
                  Floor {i + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>

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