import "./App.scss"; // Local Sass styles
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import usePushNotifications from "./utils/usePushNotifications";

const App: React.FC = () => {
  usePushNotifications();

  return (
    <div className="app">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
