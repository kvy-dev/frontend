import { useState } from "react";
import { Form, Modal, Input, InputNumber, DatePicker, Select, Button, Divider } from "antd";
import { EditFilled } from "@ant-design/icons";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { LoadScript } from "@react-google-maps/api";

import styles from "../styles.module.scss";

const { Option } = Select;

interface Props {
  edit?: boolean;
}

// const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key

const AddEditPropertyModal = ({ edit }: Props) => {
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [form] = Form.useForm();
  interface Unit {
    floor?: string;
    builtUpAreaSqFeet?: number;
    bedrooms?: number;
    parkingSpaces?: number;
    hasLift?: boolean;
    unitDescription?: string;
  }

  interface FormData {
    name?: string;
    address?: string;
    status?: string;
    areaSqYards?: number;
    facing?: string;
    location?: string;
    possessionDate?: string;
    description?: string;
    units?: Unit[];
    lat?: number;
    lon?: number;
  }

  const [formData, setFormData] = useState<FormData>({});

  const handleFormChange = (changedValues: any) => {
    setFormData((prev: any) => ({ ...prev, ...changedValues }));
  };


  const handleFinish = () => {
    console.log(formData);
  };

  // // Handle image upload
  // const handleImageUpload = (info: any) => {
  //   if (info.file.status === "done") {
  //     setPropertyImage(info.file.originFileObj);
  //   }
  // };

  // // Handle tag addition
  // const handleAddTag = () => {
  //   if (newTag.trim() && !tags.includes(newTag)) {
  //     setTags([...tags, newTag]);
  //   }
  //   setNewTag("");
  // };

  // // Handle tag removal
  // const handleRemoveTag = (removedTag: string) => {
  //   setTags(tags.filter(tag => tag !== removedTag));
  // };

  // const handleAddFloorUnit = () => {
  //   if (newFloorUnit.trim() && !floorUnits.includes(newFloorUnit)) {
  //     setFloorUnits([...floorUnits, newFloorUnit]);
  //   }
  //   setNewFloorUnit("");
  // };

  // const handleRemoveFloorUnit = (removedUnit: string) => {
  //   setFloorUnits(floorUnits.filter(unit => unit !== removedUnit));
  // };

  // // Fetch lat/lng from place details
  // const handlePlaceSelect = async (place: any) => {
  //   setSelectedLocation(place.label);

  //   // Fetch place details using Google Places API
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place.value.place_id}&key=${GOOGLE_API_KEY}`
  //   );
  //   const data = await response.json();
  //   if (data.results.length > 0) {
  //     const location = data.results[0].geometry.location;
  //     setLatLng({ lat: location.lat, lng: location.lng });
  //   }
  // };

  // Handle form submission
  // const handleSubmit = () => {
  //   const formData = {
  //     propertyImage,
  //     propertyName,
  //     address,
  //     googleLocation: selectedLocation,
  //     latLng,
  //     possessionDate,
  //     status,
  //     description,
  //     tags,
  //   };
  //   console.log("Form Data Submitted:", formData);
  //   setShowPropertyModal(false); // Close modal on submit
  // };

  return (
    <>
      <div className={styles.addPropertyCTA} onClick={() => setShowPropertyModal(true)}>
        {edit ? <EditFilled className={styles.edit} /> : "Add Property"}
      </div>

      <Modal
        open={showPropertyModal}
        onCancel={() => setShowPropertyModal(false)}
        onOk={() => null} // Save button triggers form submission
        footer={null}
        okText={edit ? "Update Property" : "Add Property"}
        style={{ width: "100vw", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, padding: 0, boxSizing: "border-box" }}
        bodyStyle={{ height: "calc(100vh - 170px)", overflowY: "auto" }}
        width="100vw"
      >
        <h2>{edit ? "Edit Property" : "Add Property"}</h2>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          initialValues={{
          }}
          onValuesChange={handleFormChange}
          onFinish={handleFinish}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
        >
          <Form.Item label="Property Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
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
                    {/* <Form.Item {...restField} label="Built-Up Area (Sq. Ft)" name={[name, "builtUpAreaSqFeet"]}>
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item {...restField} label="Bedrooms" name={[name, "bedrooms"]}>
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item {...restField} label="Parking Spaces" name={[name, "parkingSpaces"]}>
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item {...restField} label="Has Lift" name={[name, "hasLift"]}>
                      <Switch defaultChecked={formData?.units?.[name]?.hasLift} />
                    </Form.Item>
                    <Form.Item {...restField} label="Unit Description" name={[name, "unitDescription"]}>
                      <Input.TextArea rows={2} />
                    </Form.Item> */}
                    <Button type="dashed" onClick={() => remove(name)} style={{ gridColumn: '1 / -1' }}>Remove Unit</Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} style={{ gridColumn: '1 / -1' }}>Add Unit</Button>
              </>
            )}
          </Form.List>

          {/* <Form.Item label="Latitude" name="lat"> 
        <InputNumber />
      </Form.Item>

      <Form.Item label="Longitude" name="lon"> 
        <InputNumber />
      </Form.Item> */}

          <Form.Item style={{ gridColumn: '1 / -1' }}>
            <Button type="primary" htmlType="submit">Add / Edit property</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditPropertyModal;
