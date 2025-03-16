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
const TOKEN_STORAGE_KEY = 'fcm_token';

// Request Notification Permission
export const requestForToken = async (): Promise<string | null> => {
  try {
    // Check if a token is already stored
    const existingToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (existingToken) {
      console.log("FCM Token already exists:", existingToken);
      return existingToken;
    }

    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.error("Notification permission denied.");
      return null;
    }

    // Get a new token from Firebase
    const token = await getToken(messaging, {
      vapidKey: "BBJEM_GpNNGjzhyZ8wQ1-1xvf6j-BVZkcxtzsWjjbPtX4G0cI9pjN8gepuASvjnp1VXXGzyhuK5xk3jKoAPcTnY",
    });

    if (token) {
      console.log("FCM Token:", token);

      // Store token locally to avoid redundant requests
      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      // Send token to the backend
      await axiosInstance.post("/kyv/api/user/savePushServerToken", { pushServerToken: token });
    }

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Message received:", payload);
      resolve(payload);
    });
  });

// Register Firebase service worker manually
export const registerFirebaseSW = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Firebase SW Registered:", registration);
      })
      .catch((error) => {
        console.error("Firebase SW Registration Failed:", error);
      });
  }
};
