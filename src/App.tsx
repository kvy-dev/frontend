import React from 'react';
import './App.scss'; // Local Sass styles
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;