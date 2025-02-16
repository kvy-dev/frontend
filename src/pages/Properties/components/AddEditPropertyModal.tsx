import { useState } from "react";
import { Modal, Input, DatePicker, Select, Upload, Button, Tag, Divider } from "antd";
import { EditFilled, PhoneOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import styles from "../styles.module.scss";

const { Option } = Select;

interface Props {
  edit?: boolean;
}

const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key

const AddEditPropertyModal = ({ edit }: Props) => {
  const [showPropertyModal, setShowPropertyModal] = useState(false);

  // State for form fields
  const [propertyImage, setPropertyImage] = useState<File | null>(null);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [possessionDate, setPossessionDate] = useState(null);
  const [status, setStatus] = useState("open");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [floorUnits, setFloorUnits] = useState<string[]>([]);
  const [newFloorUnit, setNewFloorUnit] = useState("");

  // Handle image upload
  const handleImageUpload = (info: any) => {
    if (info.file.status === "done") {
      setPropertyImage(info.file.originFileObj);
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setNewTag("");
  };

  // Handle tag removal
  const handleRemoveTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const handleAddFloorUnit = () => {
    if (newFloorUnit.trim() && !floorUnits.includes(newFloorUnit)) {
      setFloorUnits([...floorUnits, newFloorUnit]);
    }
    setNewFloorUnit("");
  };

  const handleRemoveFloorUnit = (removedUnit: string) => {
    setFloorUnits(floorUnits.filter(unit => unit !== removedUnit));
  };

  // Fetch lat/lng from place details
  const handlePlaceSelect = async (place: any) => {
    setSelectedLocation(place.label);

    // Fetch place details using Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place.value.place_id}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setLatLng({ lat: location.lat, lng: location.lng });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      propertyImage,
      propertyName,
      address,
      googleLocation: selectedLocation,
      latLng,
      possessionDate,
      status,
      description,
      tags,
    };
    console.log("Form Data Submitted:", formData);
    setShowPropertyModal(false); // Close modal on submit
  };

  return (
    <>
      <div className={styles.addPropertyCTA} onClick={() => setShowPropertyModal(true)}>
        {edit ? <EditFilled className={styles.edit} /> : "Add Property"}
      </div>

      <Modal
        open={showPropertyModal}
        onCancel={() => setShowPropertyModal(false)}
        onOk={handleSubmit} // Save button triggers form submission
        okText={edit ? "Update Property" : "Add Property"}
        style={{ width: "100vw", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, padding: 0, boxSizing: "border-box" }}
        bodyStyle={{ height: "calc(100vh - 170px)", overflowY: "auto" }}
        width="100vw"
      >
        <h2>{edit ? "Edit Property" : "Add Property"}</h2>
        <Divider />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* Property Image Upload */}
          <div className={styles.field}>
            <p className={styles.label}>Property Image</p>
            <Upload beforeUpload={() => false} onChange={handleImageUpload}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </div>

          {/* Property Name */}
          <div className={styles.field}>
            <p className={styles.label}>Property Name</p>
            <Input
              placeholder="Enter property name"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className={styles.field}>
            <p className={styles.label}>Address</p>
            <Input
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Google Location */}
          <div className={styles.field}>
            <p className={styles.label}>Google Location</p>
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: selectedLocation,
                  onChange: handlePlaceSelect,
                  placeholder: "Search location...",
                }}
              />
            </LoadScript>
          </div>

          {/* Possession Date */}
          <div className={styles.field}>
            <p className={styles.label}>Possession Date</p>
            <DatePicker
              style={{ width: "100%" }}
              value={possessionDate}
              onChange={(date) => setPossessionDate(date)}
            />
          </div>

          <div className={styles.field}>
          <p className={styles.label}>Floor Units</p>
          <Input
            value={newFloorUnit}
            onChange={(e) => setNewFloorUnit(e.target.value)}
            onPressEnter={handleAddFloorUnit}
            placeholder="Add new floor unit"
            suffix={<PlusOutlined onClick={handleAddFloorUnit} />}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {floorUnits.map((unit) => (
              <Tag key={unit} closable onClose={() => handleRemoveFloorUnit(unit)}>
                {unit}
              </Tag>
            ))}
          </div>
        </div>

          {/* Status */}
          <div className={styles.field}>
            <p className={styles.label}>Status</p>
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              style={{ width: "100%" }}
            >
              <Option value="open">Open</Option>
              <Option value="restricted">Restricted</Option>
            </Select>
          </div>

          {/* Description */}
          <div className={styles.field}>
            <p className={styles.label}>Description</p>
            <Input.TextArea
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Multiple Tags */}
          <div className={styles.field}>
            <p className={styles.label}>Multiple Tags</p>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onPressEnter={handleAddTag}
              placeholder="Add new tag"
              suffix={<PlusOutlined onClick={handleAddTag} />}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {tags.map((tag) => (
                <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddEditPropertyModal;
