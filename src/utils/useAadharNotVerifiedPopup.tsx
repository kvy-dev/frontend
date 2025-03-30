import { useState } from "react";
import { Button, Modal } from 'antd';
import { Link } from "react-router-dom";

const useAadharNotVerifiedPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const showAadharError = () => setShowPopup(true);

  const AadharPopup = () => {
    if (!showPopup)
      return null;

    return (
      <Modal
       open={showPopup}
       footer={null}
       onCancel={() => setShowPopup(false)}
      >
        <p>Please upload your aadhar in profile to get verified.</p>
        <br />
        <Link to="/profile"><Button style={{ background: 'green', color: 'white' }}>Verify now</Button></Link>
      </Modal>
    )
  };

  return {
    showAadharError,
    AadharPopup,
  };
}

export default useAadharNotVerifiedPopup;