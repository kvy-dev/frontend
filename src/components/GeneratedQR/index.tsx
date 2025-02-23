import { useRef } from "react";
import { QRCode, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const GeneratedQR = ({ qrValue }: { qrValue: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/jpg"); // Convert QR to Image
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "QRCode.jpg"; // File name for download
      link.click();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={qrRef} style={{ display: 'none' }}>
        <QRCode value={qrValue} size={200} />
      </div>
      <br />
      <Button block onClick={handleDownload}>
        <DownloadOutlined /> QR
      </Button>
    </div>
  );
};

export default GeneratedQR;