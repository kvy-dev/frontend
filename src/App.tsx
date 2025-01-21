import React from 'react';
import './App.scss'; // Local Sass styles
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App: React.FC = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;