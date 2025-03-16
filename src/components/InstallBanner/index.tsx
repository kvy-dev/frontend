import usePWAInstall from "@/utils/usePWAInstall";
import { Button } from "antd";
import styles from './styles.module.scss';
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const InstallBanner = () => {
  const { isInstallable, installPWA } = usePWAInstall();
  const [viewInstall, setViewInstall] = useState(true);

  return (
    (isInstallable && viewInstall) && (
      <div className={styles.container}>
        <CloseOutlined onClick={() => setViewInstall(false)} className={styles.closeButton} />
        <div style={{ textAlign: 'left', flex: 1, alignSelf : 'center' }}>
          <span>Get our free app.<br /> It won't take up space on your phone.</span>
        </div>
        <Button onClick={installPWA} className="pwa-install-button">
          Install App
        </Button>
      </div>
    )
  );
};

export default InstallBanner;
