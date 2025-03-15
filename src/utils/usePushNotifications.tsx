import { useEffect, useState } from "react";
import { messaging, getToken } from "../firebase";
import { axiosInstance } from "@/services/API";

const VAPID_KEY = "BBJEM_GpNNGjzhyZ8wQ1-1xvf6j-BVZkcxtzsWjjbPtX4G0cI9pjN8gepuASvjnp1VXXGzyhuK5xk3jKoAPcTnY"; // Replace with your actual VAPID key

const usePushNotifications = () => {
  const [permission, setPermission] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Notifications API not available.");
      return;
    }

    setPermission(Notification.permission);

    if (Notification.permission === "default") {
      requestNotificationPermission();
    } else if (Notification.permission === "granted" && !isSubscribed) {
      subscribeUser();
    }
  }, [isSubscribed]);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    const userPermission = await Notification.requestPermission();
    setPermission(userPermission);
  };

  // Subscribe to push notifications
  const subscribeUser = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        await axiosInstance.post("/kyv/api/user/savePushServerToken", { pushServerToken: currentToken });
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
