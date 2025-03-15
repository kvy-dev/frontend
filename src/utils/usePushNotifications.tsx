import { useEffect, useState } from "react";
import { messaging, getToken } from "../firebase";

const VAPID_KEY = "BBJEM_GpNNGjzhyZ8wQ1-1xvf6j-BVZkcxtzsWjjbPtX4G0cI9pjN8gepuASvjnp1VXXGzyhuK5xk3jKoAPcTnY"; // Replace with your actual VAPID key

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
        await fetch("api/user/savePushServerToken", {
          method: "POST",
          body: JSON.stringify({ pushServerToken: currentToken }),
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