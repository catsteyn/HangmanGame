import React from 'react';

function Help({ showHelp, onClose }) {
  if (!showHelp) return null;

  return (
    <div className="popup-container" id="help-popup-container">
      <div className="popup" id="help-popup">
        <h2>Help</h2>
        <p>Welcome to Hangman!</p>
        <p>Guess the word by selecting letters from the keyboard.</p>
        <p>You have a limited number of incorrect guesses before the game ends.</p>
        <p>Good luck!</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Help;
