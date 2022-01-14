import React from 'react';
import './toggleButton.css';

const ToggleButton = () => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default ToggleButton;
