import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

onMessage(messaging, (payload: any) => {
  console.log('Message received. ', payload);
  // Customize how you want to handle the message
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.jpeg'
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});

export { messaging, getToken, onMessage };