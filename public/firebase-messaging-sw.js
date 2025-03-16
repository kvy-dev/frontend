importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAaE8ssCLvypoGq6a1a830exY4IQ1Ci_EI",
  authDomain: "kvys-a889d.firebaseapp.com",
  projectId: "kvys-a889d",
  storageBucket: "kvys-a889d.firebasestorage.app",
  messagingSenderId: "526821575792",
  appId: "1:526821575792:web:ed1ddcaf823498351978b5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ✅ Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  if (!payload.notification) return;

  const { title, body, click_action } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/pwa-192x192.png",
    data: { click_action }, // Pass click action for later use
  });
});

// ✅ Handle Notification Clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const clickAction = event.notification.data?.click_action || "/"; // Default to home

  event.waitUntil(
    clients.matchAll({ type: "all", includeUncontrolled: true }).then((clientList) => {
      // Check if a matching tab is already open
      const matchingClient = clientList.find((client) => client.url.includes(clickAction));

      if (matchingClient) {
        return matchingClient.focus();
      }

      // If no existing tab is found, open a new one
      return clients.openWindow(clickAction);
    })
  );
});
