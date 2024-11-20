import React from 'react';
import Timer from './components/Timer';
import Tasks from './components/Tasks';
import './assets/css/styles.css';

function App() {
  return (
    <div className="image-effect">
      <div className="container">
        <Timer />
        <div className="divider"></div>
        <Tasks />
      </div>
    </div>
  );
}

export default App;
