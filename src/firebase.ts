import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { axiosInstance } from "./services/API";

const firebaseConfig = {
  apiKey: "AIzaSyAaE8ssCLvypoGq6a1a830exY4IQ1Ci_EI",
  authDomain: "kvys-a889d.firebaseapp.com",
  projectId: "kvys-a889d",
  storageBucket: "kvys-a889d.firebasestorage.app",
  messagingSenderId: "526821575792",
  appId: "1:526821575792:web:ed1ddcaf823498351978b5"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const TOKEN_STORAGE_KEY = "fcm_token";

// ✅ Request Notification Permission & Get FCM Token
export const requestForToken = async (): Promise<string | null> => {
  try {
    const existingToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (existingToken) {
      console.log("FCM Token already exists:", existingToken);
      return existingToken;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.error("Notification permission denied.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BBJEM_GpNNGjzhyZ8wQ1-1xvf6j-BVZkcxtzsWjjbPtX4G0cI9pjN8gepuASvjnp1VXXGzyhuK5xk3jKoAPcTnY",
    });

    if (token) {
      console.log("FCM Token:", token);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      await axiosInstance.post("/kyv/api/user/savePushServerToken", { pushServerToken: token });
    }

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// ✅ Listen for Foreground Notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      console.log("Foreground Message received:", payload);

      if (payload.notification) {
        const { title, body, click_action } = payload.notification;
        const notification = new Notification(title, {
          body,
          icon: "/pwa-192x192.png",
        });

        // Open app on click
        notification.onclick = () => {
          window.open(click_action || "/", "_blank");
        };
      }

      resolve(payload);
    });
  });

// ✅ Register & Auto-Update Firebase Service Worker
export const registerFirebaseSW = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/",
      });

      console.log("Firebase SW Registered:", registration);

      // Detect if a new SW is available
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log("New SW available! Refreshing...");
                window.location.reload();
              }
            }
          });
        }
      });

      // Remove old service workers
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        if (reg !== registration) {
          console.log("Removing old service worker:", reg);
          await reg.unregister();
        }
      }
    } catch (error) {
      console.error("Firebase SW Registration Failed:", error);
    }
  }
};
