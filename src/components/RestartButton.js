import React from 'react';

const RestartButton = ({ onClick }) => {
  return (
    <button className="restart-btn" onClick={onClick}>
      Restart
    </button>
  );
};

export default RestartButton;
