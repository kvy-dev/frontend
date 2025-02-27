import { useRef } from "react";
import { QRCode, Button } from "antd";
import { FilePdfOutlined, FileImageOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";

const GeneratedQR = ({ qrValue, propertyTitle, propertyLocation }: { qrValue: string; propertyTitle: string; propertyLocation: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadJPEG = async () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/jpg"); // Convert QR to Image
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${propertyTitle}_QRCode.jpg`; // File name for download
      link.click();
    }
  };

  const downloadPDF = async () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png"); // Get QR Code as image
      const pdf = new jsPDF();

      // Get PDF width and height for centering
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.setFontSize(30);
      pdf.text(propertyTitle, pdfWidth / 2, 20, { align: "center" }); // Centered title
      pdf.setFontSize(18);
      pdf.text(`${propertyLocation}`, pdfWidth / 2, 30, { align: "center" }); // Centered location
      pdf.addImage(imageUrl, "PNG", (pdfWidth - 130) / 2, 90, 130, 130); // QR Code centered below text
      pdf.text(`KNOW YOUR VISITOR`, pdfWidth / 2, pdfHeight - 10, { align: "center" }); // Centered location

      pdf.save(`${propertyTitle}_QRCode.pdf`);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={qrRef} style={{ display: 'none' }}>
        <QRCode value={qrValue} size={200} />
      </div>
      <br />
      <Button block onClick={downloadJPEG} icon={<FileImageOutlined />}>
        Download JPEG
      </Button>
      <Button block onClick={downloadPDF} icon={<FilePdfOutlined />} style={{ marginTop: 10 }}>
        Download PDF
      </Button>
    </div>
  );
};

export default GeneratedQR;
