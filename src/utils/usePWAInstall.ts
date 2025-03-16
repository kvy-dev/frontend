import { useEffect, useState } from "react";

const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      alert("PWA is installable");
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA install");
        } else {
          console.log("User dismissed PWA install");
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return { isInstallable, installPWA };
};

export default usePWAInstall;
