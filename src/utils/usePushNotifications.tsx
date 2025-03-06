import { useEffect, useState } from "react";
import { messaging, getToken } from "../firebase";

const VAPID_KEY = "BDwYWDy825edY0SLNlsGv4fkG5H5i6rqXitTTYi7uTAboQkfJvUcvDt1T599GjBhk_Z8OxRgQMM7PSI-1Qhzkpg"; // Replace with your actual VAPID key

const usePushNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (permission === "default") {
      requestNotificationPermission();
    } else if (permission === "granted" && !isSubscribed) {
      subscribeUser();
    }
  }, [permission, isSubscribed]); // Runs only when permission or isSubscribed changes

  // Request notification permission
  const requestNotificationPermission = async () => {
    const userPermission = await Notification.requestPermission();
    setPermission(userPermission);
  };

  // Subscribe to push notifications
  const subscribeUser = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify({ token: currentToken }),
          headers: { "Content-Type": "application/json" },
        });
        console.log("User subscribed:", currentToken);
        setIsSubscribed(true);
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return { permission, requestNotificationPermission };
};

export default usePushNotifications;