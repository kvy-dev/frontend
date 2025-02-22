import { useState } from "react";
import { Button, Modal } from 'antd';

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
        <p>Please verify your aadhar to access all the properties</p>
        <br />
        <Button style={{ background: 'green', color: 'white' }}>Verify now</Button>
      </Modal>
    )
  };

  return {
    showAadharError,
    AadharPopup,
  };
}

export default useAadharNotVerifiedPopup;