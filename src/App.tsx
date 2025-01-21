import React from 'react';
import { Button, DatePicker } from 'antd';
import './App.scss'; // Local Sass styles

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Welcome to Vite + React + TypeScript + Ant Design!</h1>
      <Button type="primary">Click Me</Button>
      <DatePicker />
    </div>
  );
};

export default App;